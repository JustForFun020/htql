package com.example.bookstoreserver.service.hoadon;

import com.example.bookstoreserver.dtos.*;
import com.example.bookstoreserver.entity.ChiTietHoaDon;
import com.example.bookstoreserver.entity.HoaDon;
import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.ChiTietHoaDonRepository;
import com.example.bookstoreserver.repository.HoaDonRepository;
import com.example.bookstoreserver.repository.NguoiDungRepository;
import com.example.bookstoreserver.repository.SanPhamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoaDonService implements IHoaDonService{
    private final HoaDonRepository hoaDonRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final SanPhamRepository sanPhamRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    @Override
    public HoaDon createHoaDon(HoaDonDTO hoaDonDTO) throws Exception {
        NguoiDung nguoiDung = nguoiDungRepository.findById(hoaDonDTO.getNguoiDungId()).orElse(null);
        if (nguoiDung == null){
            throw new DataNotFoundException("Nguoi dung khong ton tai");
        }
        HoaDon hoaDon = HoaDon.builder()
                .tenHoaDon(hoaDonDTO.getTenHoaDon())
                .ngayTao(LocalDate.now())
                .loaiThanhToan(hoaDonDTO.getLoaiThanhToan())
                .trangThai(true)
                .nguoiDung(nguoiDung)
                .build();
        hoaDonRepository.save(hoaDon);
        double tongTien = 0;
        List<SanPham> sanPhams = new ArrayList<>();
        for (SanPham sanPham : sanPhamRepository.findAll()){
            for (ListSanPhamDTO sanPhamDTO : hoaDonDTO.getListSanPhamDTOS()){
                if (sanPhamDTO.getSanPhamId() == sanPham.getId()){
                    SanPham sp = sanPhamRepository.findById(sanPhamDTO.getSanPhamId()).orElseThrow(()-> new DataNotFoundException("San Pham Khong ton tai"));
                    sp.setHoaDon(hoaDon);
                    sp.setSoLuong(sanPhamDTO.getSoLuong());
                    sanPhamRepository.save(sp);

                    //Thêm sản phẩm vào tính tiền
                    sanPhams.add(sanPham);
                    tongTien += sanPham.getGiaBan()*sanPham.getSoLuong();


                    //Lưu chi tiết hóa đơn
                    ChiTietHoaDon chiTietHoaDon = new ChiTietHoaDon();
                    chiTietHoaDon.setTenSanPham(sanPham.getTenSanPham());
                    chiTietHoaDon.setSoLuong(sanPham.getSoLuong());
                    chiTietHoaDon.setHoaDon(hoaDon);
                    chiTietHoaDonRepository.save(chiTietHoaDon);
                }
            }
        }
        hoaDon.setDanhSachSanPham(sanPhams);
        hoaDon.setTongTien(tongTien);
        return hoaDonRepository.save(hoaDon);
    }

    @Override
    public HoaDon updateHoaDon(Long id, HoaDonDTO hoaDonDTO) throws Exception {
        HoaDon existingHoaDon = hoaDonRepository.findById(id).orElse(null);
        if (existingHoaDon != null){
            NguoiDung nguoiDung = nguoiDungRepository.findById(hoaDonDTO.getNguoiDungId()).orElse(null);
            if (nguoiDung == null){
                throw new DataNotFoundException("Nguoi dung khong ton tai");
            }
            HoaDon hoaDon = HoaDon.builder()
                    .tenHoaDon(hoaDonDTO.getTenHoaDon())
                    .loaiThanhToan(hoaDonDTO.getLoaiThanhToan())
                    .trangThai(hoaDonDTO.getTrangThai())
                    .build();
            return hoaDonRepository.save(hoaDon);
        }
        return null;
    }

    @Override
    public List<HoaDon> getAllHoaDon() {
        return hoaDonRepository.findAll();
    }

    @Override
    public String findHoaDonById(Long id) throws DataNotFoundException {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElse(null);
        if(hoaDon == null){
            throw new DataNotFoundException("hoa don khong ton tai");
        }
        hoaDonRepository.delete(hoaDon);
        return "xoa thanh cong hoa don co id = " + id;
    }

    @Override
    public String deleteHoaDon(Long id) {
        HoaDon hoaDon = hoaDonRepository.findById(id).orElse(null);
        if (hoaDon != null){
            for (ChiTietHoaDon chiTietHoaDon : chiTietHoaDonRepository.findAll()){
                if (chiTietHoaDon.getHoaDon().getId() == id){
                    chiTietHoaDonRepository.delete(chiTietHoaDon);
                }
            }
            hoaDonRepository.delete(hoaDon);
            return "xoa thanh cong hoa don co id = " + id;
        }
        return null;
    }
}
