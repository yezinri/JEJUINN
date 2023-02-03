package com.jejuinn.backend.api.dto.response.travelplace;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImgUrlWithReviewUid {
    private Long reviewUid;
    private String imgPath;
}
