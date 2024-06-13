package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.entity.NguoiDung;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DanhMucSanPhamDTO {
    @JsonProperty("so_luong")
    private int soLuong;
    private String ten;
    @JsonProperty("khohang_id")
    private Long khoHangId;
    @JsonProperty("nguoidung_id")
    private Long nguoiDungId;
}
