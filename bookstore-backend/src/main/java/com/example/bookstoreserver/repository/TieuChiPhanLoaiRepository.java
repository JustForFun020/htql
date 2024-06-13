package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.TieuChiPhanLoai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TieuChiPhanLoaiRepository extends JpaRepository<TieuChiPhanLoai, Long> {
}
