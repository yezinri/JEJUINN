package com.jejuinn.backend.api.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * 이메일만 있는 DTO
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SimpleEmailReq {
    @NotNull
    @Size(min = 10)
    String email;
}
