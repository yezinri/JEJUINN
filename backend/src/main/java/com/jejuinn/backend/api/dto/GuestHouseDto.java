package com.jejuinn.backend.api.dto;

import com.jejuinn.backend.db.entity.GuestHouse;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestHouseDto {
    private Long uid;

    private String guestHouseName;

    private Long representativeUid;

    private String address;

    private String addressDetail;

    public static GuestHouseDto of(GuestHouse guestHouse){
        if(guestHouse == null) return null;
        return GuestHouseDto.builder()
                .uid(guestHouse.getUid())
                .guestHouseName(guestHouse.getGuestHouseName())
                .representativeUid(guestHouse.getRepresentativeUid())
                .address(guestHouse.getAddress())
                .addressDetail(guestHouse.getAddressDetail())
                .build();
    }
}