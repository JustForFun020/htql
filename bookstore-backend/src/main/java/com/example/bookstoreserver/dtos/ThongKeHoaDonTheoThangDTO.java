package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongKeHoaDonTheoThangDTO {
    private int thang;
    private int nam;
    @JsonProperty("tong_tien")
    private double tongTien;
}
