package com.jejuinn.backend.api.controller;

import com.jejuinn.backend.api.dto.request.resumeinfo.InsertResumeInfoPostReq;
import com.jejuinn.backend.db.repository.ResumeInfoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(tags = "구직 관련 기능 API")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeInfoRepository resumeInfoRepository;

    @PostMapping("/auth/job-search")
    @ApiOperation(value = "지원서 작성", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(등록 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> insertResumeInfo(@Valid @RequestPart InsertResumeInfoPostReq insertResumeInfoPostReq) {
        resumeInfoRepository.save(insertResumeInfoPostReq.toResumeInfo());
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/auth/job-search/{resumeInfoUid}")
    @ApiOperation(value = "지원서 삭제", notes = "지원서")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK(삭제 성공)"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteResumeInfo(@PathVariable String resumeInfoUid) {
        resumeInfoRepository.deleteById(Long.parseLong(resumeInfoUid));
        return ResponseEntity.status(200).build();
    }

}