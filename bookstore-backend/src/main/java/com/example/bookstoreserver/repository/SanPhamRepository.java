package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    @Query("SELECT sp FROM SanPham sp " +
            "JOIN sp.danhMucSanPham dmsp " +
            "JOIN dmsp.danhSachTieuChi tc " +
            "WHERE tc.tenTheLoai IN :danhSachTenTheLoai " +
            "GROUP BY sp " +
            "HAVING COUNT(DISTINCT tc.tenTheLoai) = :soLuongTieuChi")
    List<SanPham> timSanPhamTheoTieuChiPhanLoai(List<String> danhSachTenTheLoai, long soLuongTieuChi);
    SanPham findSanPhamsByTenSanPham(String tenSanPham);
}
