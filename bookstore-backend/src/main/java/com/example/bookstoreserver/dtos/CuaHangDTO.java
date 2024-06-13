package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CuaHangDTO {
    @JsonProperty("ten_cua_hang")
    private String tenCuaHang;
    @JsonProperty("dia_chi")
    private String diaChi;
    @JsonProperty("so_dien_thoai")
    private String soDienThoai;
    @JsonProperty("mo_ta")
    private String moTa;
}
