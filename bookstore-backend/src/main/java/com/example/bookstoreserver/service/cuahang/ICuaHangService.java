package com.example.bookstoreserver.service.cuahang;

import com.example.bookstoreserver.dtos.CuaHangDTO;
import com.example.bookstoreserver.entity.CuaHang;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

public interface ICuaHangService {
    CuaHang createCuaHang(CuaHangDTO cuaHangDTO);
    String deleteCuaHang(Long id) throws DataNotFoundException;
}
