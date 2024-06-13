package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNamDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNgay;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoQuyDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoThangDTO;
import com.example.bookstoreserver.service.thongkedoanhthu.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("thongkedoanhthu")
@RequiredArgsConstructor
public class ThongKeController {
    private final ThongKeService thongKeService;
    @GetMapping("/hoadon/{ngay}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<ThongKeHoaDonTheoNgay>> thongKeHoaDonTheoNgay(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay) {
        List<ThongKeHoaDonTheoNgay> thongKeList = thongKeService.thongKeHoaDonTheoNgay(ngay);
        return ResponseEntity.ok(thongKeList);
    }
    @GetMapping("/hoadon/thang/{nam}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<ThongKeHoaDonTheoThangDTO>> thongKeHoaDonTheoThang(@PathVariable int nam) {
        List<ThongKeHoaDonTheoThangDTO> thongKeList = thongKeService.thongKeHoaDonTheoThang(nam);
        return ResponseEntity.ok(thongKeList);
    }
    @GetMapping("/hoadon/quy/{nam}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<ThongKeHoaDonTheoQuyDTO>> thongKeHoaDonTheoQuy(@PathVariable int nam) {
        List<ThongKeHoaDonTheoQuyDTO> thongKeList = thongKeService.thongKeHoaDonTheoQuy(nam);
        return ResponseEntity.ok(thongKeList);
    }
    @GetMapping("/hoadon/nam")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<ThongKeHoaDonTheoNamDTO>> thongKeHoaDonTheoNam() {
        List<ThongKeHoaDonTheoNamDTO> thongKeList = thongKeService.thongKeHoaDonTheoNam();
        return ResponseEntity.ok(thongKeList);
    }
    @GetMapping("/loinhuan")
    @PreAuthorize("hasRole('QUANLY')")
    public List<Map<LocalDate, Double>> thongKeLoiNhuanTheoNgay(){
        List<Map<LocalDate, Double>> resultList = thongKeService.loiNhuanTheoNgay();
        return resultList;
    }
}
