package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.entity.HoaDon;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SanPhamDTO {
    @JsonProperty("ten_san_pham")
    private String tenSanPham;
    @JsonProperty("so_luong")
    private int soLuong;
    @JsonProperty("gia_ban")
    private double giaBan;
    @JsonProperty("mo_ta")
    private String moTa;
    @JsonProperty("img_hero")
    private String imgHero;
    @JsonProperty("hoadon_id")
    private int hoaDonId;
    @JsonProperty("danhmucsp_id")
    private int danhMucSanPhamId;
}
