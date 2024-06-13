package com.example.bookstoreserver.service.khohang;


import com.example.bookstoreserver.dtos.KhoHangDTO;
import com.example.bookstoreserver.dtos.TongTienBanDuocThangDTO;
import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

import java.util.List;

public interface IKhoHangService {
    List<KhoHang> getAllKhoHang();
    KhoHang getKhoHangById(Long id) throws DataNotFoundException;
    KhoHang createKhoHang(KhoHangDTO khoHangDTO) throws DataNotFoundException;
    String deleteKhoHang(Long id) throws DataNotFoundException;
}
