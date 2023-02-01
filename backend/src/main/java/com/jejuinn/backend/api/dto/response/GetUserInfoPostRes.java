package com.jejuinn.backend.api.dto.response;

import com.jejuinn.backend.db.entity.User;
import lombok.*;

/**
 * 회원정보 응답 DTO ([Post] : /auth/users)
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetUserInfoPostRes {

    private Long uid;

    private String email;

    private String username;

    private String nickname;

    private boolean emailReceiveAllow;

    private String phone;


    public static GetUserInfoPostRes from(User user) {
        return GetUserInfoPostRes.builder()
                .uid(user.getUid())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .phone(user.getPhone()).build();
    }
}