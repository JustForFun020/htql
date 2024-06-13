package com.example.bookstoreserver.service.sanpham;

import com.example.bookstoreserver.dtos.ImageSanPhamDTO;
import com.example.bookstoreserver.dtos.SanPhamDTO;
import com.example.bookstoreserver.dtos.TieuChiPhanLoaiDTO;
import com.example.bookstoreserver.entity.ImageSanPham;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ISanPhamService {
    SanPham createSanPham(SanPhamDTO sanPhamDTO) throws Exception;
    SanPham updateSanPham(Long id, SanPhamDTO sanPhamDTO) throws Exception;
    void deleteSanPham(Long id);
    Page<SanPhamResponse> getAllSanPhams(PageRequest pageRequest);
    ImageSanPham createImageSanPham(Long sanPhamId, ImageSanPhamDTO imageSanPhamDTO) throws Exception;
    SanPham getSanPhamById(Long id) throws DataNotFoundException;
    List<SanPham> timSanPhamTheoTieuChiPhanLoai(TieuChiPhanLoaiDTO tieuChiPhanLoaiDTO);
}
