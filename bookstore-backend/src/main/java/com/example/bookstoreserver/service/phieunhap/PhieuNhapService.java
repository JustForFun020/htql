package com.example.bookstoreserver.service.phieunhap;

import com.example.bookstoreserver.dtos.PhieuNhapDTO;
import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.entity.NhaCungCap;
import com.example.bookstoreserver.entity.PhieuNhap;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.NguoiDungRepository;
import com.example.bookstoreserver.repository.NhaCungCapRepository;
import com.example.bookstoreserver.repository.PhieuNhapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhieuNhapService implements IPhieuNhapService{
    private final PhieuNhapRepository phieuNhapRepository;
    private final NhaCungCapRepository nhaCungCapRepository;
    private final NguoiDungRepository nguoiDungRepository;

    @Override
    public PhieuNhap createPhieuNhap(PhieuNhapDTO phieuNhapDTO) throws DataNotFoundException {
        NguoiDung nguoiDung = nguoiDungRepository.findById(phieuNhapDTO.getNguoiDungId())
                .orElseThrow(() -> new DataNotFoundException("Nguoi Dung Khong ton tai"));
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(phieuNhapDTO.getNhaCungCapId())
                .orElseThrow(() -> new DataNotFoundException("Nha cung cap khong ton tai"));
        PhieuNhap phieuNhap = PhieuNhap.builder()
                .tenSanPham(phieuNhapDTO.getTenSanPham())
                .giaNhap(phieuNhapDTO.getGiaNhap())
                .ngayNhap(LocalDate.now())
                .soLuong(phieuNhapDTO.getSoLuong())
                .nguoiDung(nguoiDung)
                .nhaCungCap(nhaCungCap)
                .build();
        return phieuNhapRepository.save(phieuNhap);
    }

    @Override
    public List<PhieuNhap> getAllPhieuNhap() {
        return phieuNhapRepository.findAll();
    }

    @Override
    public PhieuNhap getPhieuNhapById(Long id) throws DataNotFoundException {
        Optional<PhieuNhap> phieuNhap = phieuNhapRepository.findById(id);
        if (phieuNhap.isPresent()){
            return phieuNhap.get();
        }
        throw new DataNotFoundException("Phieu nhap khong ton tai");
    }
}
