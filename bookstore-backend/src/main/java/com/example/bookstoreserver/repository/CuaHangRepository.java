package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.CuaHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuaHangRepository extends JpaRepository<CuaHang, Long> {
}
