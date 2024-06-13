package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhieuNhapDTO {
    @JsonProperty("ten_san_pham")
    private String tenSanPham;
    @JsonProperty("so_luong")
    private int soLuong;
    @JsonProperty("gia_nhap")
    private double giaNhap;
    @JsonProperty("nguoidung_id")
    private Long nguoiDungId;
    @JsonProperty("nhacungcap_id")
    private Long nhaCungCapId;
}
