package com.example.bookstoreserver.service.sanpham;

import com.example.bookstoreserver.dtos.SanPhamDTO;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ISanPhamService {
    SanPham createSanPham(SanPhamDTO sanPhamDTO) throws Exception;
    SanPham updateSanPham(int id, SanPhamDTO sanPhamDTO) throws Exception;
    void deleteSanPham(int id);
    Page<SanPhamResponse> getAllSanPhams(PageRequest pageRequest);
}
