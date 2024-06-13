package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.PhieuNhap;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NhaCungCapDTO {
    @JsonProperty("ten_nha_cung_cap")
    private String tenNhaCungCap;
    @JsonProperty("dia_chi")
    private String diaChi;
    @JsonProperty("so_dien_thoai")
    private String soDienThoai;
    @JsonProperty("mo_ta")
    private String moTa;
}
