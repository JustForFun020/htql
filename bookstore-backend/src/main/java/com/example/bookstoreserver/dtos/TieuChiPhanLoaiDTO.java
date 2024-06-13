package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TieuChiPhanLoaiDTO {
    @JsonProperty("danh_sach_tieu_chi")
    private List<String> danhSachTenTieuChi;
}
