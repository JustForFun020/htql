package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.SanPham;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonDTO {
    @JsonProperty("ten_hoa_don")
    private String tenHoaDon;
    @JsonProperty("loai_thanh_toan")
    private String loaiThanhToan;
    @JsonProperty("trang_thai")
    private Boolean trangThai; //thuộc về admin
    @JsonProperty("nguoidung_id")
    private Long nguoiDungId;
    private List<ListSanPhamDTO> listSanPhamDTOS;
}
