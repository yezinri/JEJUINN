package com.jejuinn.backend.db.repository;

import com.jejuinn.backend.db.entity.GuestHouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestHouseRepository extends JpaRepository<GuestHouse, Long> {
    public Long countBy();
}
