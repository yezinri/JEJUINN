package com.tamnara.backend.api.dto.response;

import com.tamnara.backend.db.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
                .emailReceiveAllow(user.isEmailReceiveAllow())
                .phone(user.getPhone()).build();
    }
}
