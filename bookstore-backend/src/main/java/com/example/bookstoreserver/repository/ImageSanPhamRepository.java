package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.ImageSanPham;
import com.example.bookstoreserver.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageSanPhamRepository extends JpaRepository<ImageSanPham, Long> {
    List<ImageSanPham> findBySanPhamId(Long sanPhamId);
}
