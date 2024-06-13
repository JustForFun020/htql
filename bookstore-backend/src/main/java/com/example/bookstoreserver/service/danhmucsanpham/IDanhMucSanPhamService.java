package com.example.bookstoreserver.service.danhmucsanpham;

import com.example.bookstoreserver.dtos.DanhMucSanPhamDTO;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IDanhMucSanPhamService {
    List<DanhMucSanPhamDTO> getAllDanhMuc();
    DanhMucSanPham createDanhMucSanPham(DanhMucSanPhamDTO danhMucSanPhamDTO) throws DataNotFoundException;
    String deleteDanhMucSanPham(Long id) throws DataNotFoundException;
}
