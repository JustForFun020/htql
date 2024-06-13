package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.PhieuNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuNhapRepository extends JpaRepository<PhieuNhap, Long> {
    PhieuNhap findPhieuNhapByTenSanPham(String tenSanPham);
}
