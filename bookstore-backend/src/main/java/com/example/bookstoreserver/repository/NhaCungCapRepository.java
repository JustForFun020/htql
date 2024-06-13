package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Long> {
    @Query("SELECT ncc.tenNhaCungCap, (SUM(pn.soLuong)) " +
            "FROM NhaCungCap ncc " +
            "JOIN ncc.danhSachPhieuNhap pn " +
            "GROUP BY ncc.tenNhaCungCap " +
            "ORDER BY SUM(pn.soLuong) DESC")
    List<Object[]> thongKeNhaCungCapTheoSoLuongNhap();
}
