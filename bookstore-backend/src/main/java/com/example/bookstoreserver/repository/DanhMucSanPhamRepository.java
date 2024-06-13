package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.DanhMucSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhMucSanPhamRepository extends JpaRepository<DanhMucSanPham, Long> {
}
