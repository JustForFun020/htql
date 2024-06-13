package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SanPhamTonKhoDTO {
    @JsonProperty("ten_san_pham")
    private String tenSanPham;
    @JsonProperty("so_luong")
    private Integer soLuong;
}
