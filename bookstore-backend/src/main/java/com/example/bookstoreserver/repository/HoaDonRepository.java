package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.dtos.TongTienBanDuocDTO;
import com.example.bookstoreserver.dtos.TongTienBanDuocThangDTO;
import com.example.bookstoreserver.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
    @Query(value = "SELECT DATE(h.ngay_tao) as ngay, SUM(h.tong_tien) as tongTien " +
            "FROM hoadon h " +
            "WHERE DATE(h.ngay_tao) = :date " +
            "GROUP BY DATE(h.ngay_tao)", nativeQuery = true)
    List<Object[]> findRevenueByDay(@Param("date") LocalDate date);

    @Query("SELECT FUNCTION('MONTH', h.ngayTao), FUNCTION('YEAR', h.ngayTao), SUM(h.tongTien) " +
            "FROM HoaDon h " +
            "WHERE FUNCTION('YEAR', h.ngayTao) = :year " +
            "GROUP BY FUNCTION('MONTH', h.ngayTao), FUNCTION('YEAR', h.ngayTao)")
    List<Object[]> findRevenueByMonth(int year);

    @Query("SELECT FUNCTION('QUARTER', h.ngayTao), FUNCTION('YEAR', h.ngayTao), SUM(h.tongTien) " +
            "FROM HoaDon h " +
            "WHERE FUNCTION('YEAR', h.ngayTao) = :year " +
            "GROUP BY FUNCTION('QUARTER', h.ngayTao), FUNCTION('YEAR', h.ngayTao)")
    List<Object[]> findRevenueByQuarter(int year);

    @Query("SELECT FUNCTION('YEAR', h.ngayTao), SUM(h.tongTien) " +
            "FROM HoaDon h " +
            "GROUP BY FUNCTION('YEAR', h.ngayTao)")
    List<Object[]> findRevenueByYear();
}
