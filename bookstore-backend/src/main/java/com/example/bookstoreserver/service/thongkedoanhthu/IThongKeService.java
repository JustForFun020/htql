package com.example.bookstoreserver.service.thongkedoanhthu;

import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNamDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNgay;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoQuyDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoThangDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface IThongKeService {
    List<ThongKeHoaDonTheoNgay> thongKeHoaDonTheoNgay(LocalDate date);
    List<ThongKeHoaDonTheoThangDTO> thongKeHoaDonTheoThang(int year);
    List<ThongKeHoaDonTheoQuyDTO> thongKeHoaDonTheoQuy(int year);
    List<ThongKeHoaDonTheoNamDTO> thongKeHoaDonTheoNam();
    List<Map<LocalDate, Double>> loiNhuanTheoNgay();
}
