package com.example.bookstoreserver.service.thongkedoanhthu;

import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNamDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoNgay;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoQuyDTO;
import com.example.bookstoreserver.dtos.ThongKeHoaDonTheoThangDTO;
import com.example.bookstoreserver.entity.HoaDon;
import com.example.bookstoreserver.entity.PhieuNhap;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.repository.HoaDonRepository;
import com.example.bookstoreserver.repository.PhieuNhapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ThongKeService implements IThongKeService{
    private final HoaDonRepository hoaDonRepository;
    private final PhieuNhapRepository phieuNhapRepository;

    @Override
    public List<ThongKeHoaDonTheoNgay> thongKeHoaDonTheoNgay(LocalDate date) {
        List<Object[]> soLieuThongKe = hoaDonRepository.findRevenueByDay(date);
        return soLieuThongKe.stream()
                .map(record -> new ThongKeHoaDonTheoNgay(LocalDate.parse(record[0].toString()), ((Number) record[1]).doubleValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ThongKeHoaDonTheoThangDTO> thongKeHoaDonTheoThang(int year) {
        List<Object[]> soLieuThongKe = hoaDonRepository.findRevenueByMonth(year);
        return soLieuThongKe.stream()
                .map(record -> new ThongKeHoaDonTheoThangDTO((int) record[0], (int) record[1], ((Number) record[2]).doubleValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ThongKeHoaDonTheoQuyDTO> thongKeHoaDonTheoQuy(int year) {
        List<Object[]> soLieuThongKe = hoaDonRepository.findRevenueByQuarter(year);
        return soLieuThongKe.stream()
                .map(record -> new ThongKeHoaDonTheoQuyDTO((int) record[0], (int) record[1], ((Number) record[2]).doubleValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ThongKeHoaDonTheoNamDTO> thongKeHoaDonTheoNam() {
        List<Object[]> soLieuThongKe = hoaDonRepository.findRevenueByYear();
        return soLieuThongKe.stream()
                .map(record -> new ThongKeHoaDonTheoNamDTO((int) record[0], ((Number) record[1]).doubleValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Map<LocalDate, Double>> loiNhuanTheoNgay() {
        List<Map<LocalDate, Double>> resultList = new ArrayList<>();
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        Map<LocalDate, Double> map = new HashMap<>();
        double loiNhuan = 0;
        for (HoaDon hoaDon : hoaDonList){
            for (SanPham sanPham : hoaDon.getDanhSachSanPham()){
                if (sanPham.getTenSanPham().equals(phieuNhapRepository.findPhieuNhapByTenSanPham(sanPham.getTenSanPham()))){
                    PhieuNhap phieuNhap = phieuNhapRepository.findPhieuNhapByTenSanPham(sanPham.getTenSanPham());
                    loiNhuan += sanPham.getGiaBan()*sanPham.getSoLuong() - phieuNhap.getGiaNhap()*sanPham.getSoLuong();
                }
            }
            map.put(hoaDon.getNgayTao(), loiNhuan);
        }
        resultList.add(map);
        return resultList;
    }
}
