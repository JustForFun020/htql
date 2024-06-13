package com.example.bookstoreserver.service.cuahang;

import com.example.bookstoreserver.dtos.CuaHangDTO;
import com.example.bookstoreserver.entity.CuaHang;
import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.CuaHangRepository;
import com.example.bookstoreserver.repository.KhoHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CuaHangService implements ICuaHangService{
    private final CuaHangRepository cuaHangRepository;
    private final KhoHangRepository khoHangRepository;

    @Override
    public CuaHang createCuaHang(CuaHangDTO cuaHangDTO) {
        CuaHang cuaHang = CuaHang.builder()
                .tenCuaHang(cuaHangDTO.getTenCuaHang())
                .diaChi(cuaHangDTO.getDiaChi())
                .soDienThoai(cuaHangDTO.getSoDienThoai())
                .moTa(cuaHangDTO.getMoTa())
                .build();
        cuaHangRepository.save(cuaHang);
        return cuaHang;
    }

    @Override
    public String deleteCuaHang(Long id) throws DataNotFoundException {
        CuaHang cuaHang = cuaHangRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("cua hang khong ton tai"));
        for (KhoHang khoHang : khoHangRepository.findAll()){
            if (khoHang.getCuaHang().getId() == id){
                khoHangRepository.delete(khoHang);
            }
        }
        cuaHangRepository.delete(cuaHang);
        return "da xoa thanh cong cua hang co id = " + id;
    }
}
