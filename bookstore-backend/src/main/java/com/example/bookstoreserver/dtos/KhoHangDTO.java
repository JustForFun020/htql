package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KhoHangDTO {
    @JsonProperty("dia_chi")
    private String diaChi;
    @JsonProperty("so_luong_ton_kho")
    private Integer soLuongTonKho;
    @JsonProperty("cuahang_id")
    private Long cuaHangId;
}
