package com.example.bookstoreserver.service.hoadon;

import com.example.bookstoreserver.dtos.HoaDonDTO;
import com.example.bookstoreserver.dtos.ThongKeRequest;
import com.example.bookstoreserver.dtos.TongTienBanDuocDTO;
import com.example.bookstoreserver.dtos.TongTienBanDuocThangDTO;
import com.example.bookstoreserver.entity.HoaDon;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

import java.util.List;

public interface IHoaDonService {
    HoaDon createHoaDon(HoaDonDTO hoaDonDTO) throws Exception;
    HoaDon updateHoaDon(Long id, HoaDonDTO hoaDonDTO) throws Exception;
    List<HoaDon> getAllHoaDon();
    String findHoaDonById(Long id) throws DataNotFoundException;
    String deleteHoaDon(Long id);
}
