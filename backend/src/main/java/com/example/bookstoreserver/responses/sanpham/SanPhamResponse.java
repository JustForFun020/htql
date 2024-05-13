package com.example.bookstoreserver.responses.sanpham;

import com.example.bookstoreserver.entity.ImageSanPham;
import com.example.bookstoreserver.entity.SanPham;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class SanPhamResponse {
    private Long id;
    @JsonProperty("ten_san_pham")
    private String tenSanPham;
    @JsonProperty("so_luong")
    private int soLuong;
    @JsonProperty("gia_ban")
    private double giaBan;

    @JsonProperty("ngay_tao")
    private LocalDate ngayTao;
    @JsonProperty("ngay_cap_nhat")
    private LocalDate ngayCapNhat;
    @JsonProperty("image_san_pham")
    private List<ImageSanPham> imageSanPhams;

    public static SanPhamResponse fromSanPham(SanPham sanPham){
        SanPhamResponse sanPhamResponse = SanPhamResponse.builder()
                .id(sanPham.getId())
                .tenSanPham(sanPham.getTenSanPham())
                .soLuong(sanPham.getSoLuong())
                .giaBan(sanPham.getGiaBan())
                .imageSanPhams(sanPham.getDanhSachImage())
                .build();
        sanPhamResponse.setNgayTao(sanPham.getNgayTao());
        sanPhamResponse.setNgayCapNhat(sanPham.getNgayCapNhat());
        return sanPhamResponse;
    }
}
