package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.recruitment.InsertRecruitmentPostReq;
import com.jejuinn.backend.api.dto.request.recruitment.InsertWorkPostReq;
import com.jejuinn.backend.api.dto.response.recruitment.MyRecruitmentListRes;
import com.jejuinn.backend.api.dto.response.recruitment.RecruitmentDetailRes;
import com.jejuinn.backend.api.dto.response.recruitment.WorkDetailRes;
import com.jejuinn.backend.api.dto.response.recruitment.WorkListRes;
import com.jejuinn.backend.api.service.s3.S3Uploader;
import com.jejuinn.backend.db.entity.Recruitment;
import com.jejuinn.backend.db.entity.Work;
import com.jejuinn.backend.db.repository.ImageRepository;
import com.jejuinn.backend.db.repository.RecruitmentRepository;
import com.jejuinn.backend.db.repository.UserRepository;
import com.jejuinn.backend.db.repository.WorkRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Api(tags = "구인 관련 기능 API")
@RequiredArgsConstructor
public class RecruitmentController {

    private final WorkRepository workRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;
    private static final String RECRUITMENT_TYPE = "RECRUITMENT";

    @GetMapping("/api/job-offer")
    @ApiOperation(value = "모집중인 직무 모두 보기(시간 순서대로)", notes = "구인 공고의 모든 직무 정보들을 리턴합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "NO CONTENT(데이터가 없습니다)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getWorkList(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.status(200)
                .body(workRepository.findAll(pageable)
                        .map(work -> WorkListRes.of(work)));
    }

    @GetMapping("/api/job-offer/{recruitmentUid}")
    @ApiOperation(value = "recruitmentUid를 통해 모집공고 세부 정보 제공", notes = "특정 구인 공고에 대한 정보를 리턴합니다." +
            "직무, 이미지, 채용공고 관련 정보 제공")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 400, message = "BAD REQEUST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getRecruitmentDetail(@PathVariable Long recruitmentUid) {
        return ResponseEntity.status(200)
                .body(recruitmentRepository.findById(recruitmentUid)
                        .map(recruitment ->
                                RecruitmentDetailRes.of(recruitment,
                                        WorkDetailRes.ofDetail(workRepository.findAllByRecruitmentUid(recruitmentUid)),
                                        imageRepository.findAllByPostTypeAndPostUid(RECRUITMENT_TYPE, recruitmentUid)
                                )));
    }

    @PostMapping("/auth/job-offer")
    @ApiOperation(value = "모집공고 작성", notes = "모집공고(InsertRecruitmentPostReq) + 인재상(String 배열), " +
            "직무(InsertWorkPostReq) : 직무, 이미지(images)를 보내주면 이를 저장합니다.\n" +
            "ReqeustModel에 대한 자세한 설명은 밑에 Model 참고")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertRecruitment(@Valid @RequestPart InsertRecruitmentPostReq insertRecruitmentPostReq,
                                               @RequestPart List<MultipartFile> images,
                                               @Valid @RequestPart InsertWorkPostReq insertWorkPostReq) {
        Recruitment recruitment = recruitmentRepository.save(insertRecruitmentPostReq.toRecruitment());
        Work work = workRepository.save(insertWorkPostReq.toWork(recruitment));

        try {
            s3Uploader.uploadImages(images, RECRUITMENT_TYPE, recruitment.getUid());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/job-offer/{recruitmentUid}")
    @ApiOperation(value = "모집공고 삭제", notes = "모집공고(Recruitment), 직무(Work), 이미지(images)를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteRecruitment(@PathVariable Long recruitmentUid) {
        Optional<List<Long>> list = imageRepository.findUidByPostTypeAndPostUid(RECRUITMENT_TYPE, recruitmentUid);
        recruitmentRepository.deleteById(recruitmentUid);
        for(Long uid : list.get()) {
            try {
                s3Uploader.delete(uid);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(400).build();
            }
        }
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/auth/job-offer/{guestHouseUid}")
    @ApiOperation(value = "특정 게스트하우스에 대한 모집공고 리스트 확인", notes = "gusetHouseUid를 통해 특정 게스트하우스에 대한 모든 모집공고 목록을 보여줍니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(조회 성공)"),
            @ApiResponse(code = 204, message = "데이터가 없습니다."),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getMyRecruitment(@PathVariable Long guestHouseUid) {
        return ResponseEntity.status(200)
                .body(recruitmentRepository.findAllByGuestHouseUidOrderByDateCreatedDesc(guestHouseUid)
                        .stream().map(recruitment -> MyRecruitmentListRes.of(recruitment))
                        .collect(Collectors.toList()));
    }
}
