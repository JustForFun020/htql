package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChiTietHoaDonDTO {
    @JsonProperty("ten_san_pham")
    private String tenSanPham;
    @JsonProperty("so_luong")
    private int soLuong;
}
