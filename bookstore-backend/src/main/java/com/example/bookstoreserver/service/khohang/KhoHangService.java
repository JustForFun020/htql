package com.example.bookstoreserver.service.khohang;

import com.example.bookstoreserver.dtos.DanhMucSanPhamDTO;
import com.example.bookstoreserver.dtos.KhoHangDTO;
import com.example.bookstoreserver.entity.CuaHang;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.CuaHangRepository;
import com.example.bookstoreserver.repository.DanhMucSanPhamRepository;
import com.example.bookstoreserver.repository.KhoHangRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KhoHangService implements IKhoHangService{
    private final KhoHangRepository khoHangRepository;
    private final CuaHangRepository cuaHangRepository;
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;

    @Override
    public List<KhoHang> getAllKhoHang() {
        return khoHangRepository.findAll();
    }

    @Override
    public KhoHang getKhoHangById(Long id) throws DataNotFoundException {
        KhoHang khoHang = khoHangRepository.findById(id).orElse(null);
        if (khoHang == null){
            throw new DataNotFoundException("san pham khong ton tai");
        }
        return khoHang;
    }

    @Override
    public KhoHang createKhoHang(KhoHangDTO khoHangDTO) throws DataNotFoundException {
        CuaHang cuaHang = cuaHangRepository.findById(khoHangDTO.getCuaHangId())
                .orElseThrow(()->new DataNotFoundException("cua hang khong ton tai"));
        KhoHang khoHang = KhoHang.builder()
                .diaChi(khoHangDTO.getDiaChi())
                .soLuongTonKho(khoHangDTO.getSoLuongTonKho())
                .cuaHang(cuaHang)
                .build();
        khoHangRepository.save(khoHang);
        return khoHang;
    }

    @Override
    public String deleteKhoHang(Long id) throws DataNotFoundException {
        KhoHang khoHang = khoHangRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("kho hang khong ton tai"));
        for (DanhMucSanPham danhMucSanPham : danhMucSanPhamRepository.findAll()){
            if (danhMucSanPham.getKhoHang().getId() == id){
                danhMucSanPhamRepository.delete(danhMucSanPham);
            }
        }
        khoHangRepository.delete(khoHang);
        return "xoa thanh cong kho hang co id = " + id;
    }
}
