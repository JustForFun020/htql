package com.example.bookstoreserver.service.phieunhap;

import com.example.bookstoreserver.dtos.PhieuNhapDTO;
import com.example.bookstoreserver.entity.PhieuNhap;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

import java.util.List;

public interface IPhieuNhapService {
    PhieuNhap createPhieuNhap(PhieuNhapDTO phieuNhapDTO) throws DataNotFoundException;
    List<PhieuNhap> getAllPhieuNhap();
    PhieuNhap getPhieuNhapById(Long id) throws DataNotFoundException;
}
