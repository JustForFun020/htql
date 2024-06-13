package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.PhieuNhap;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongKeHoaDonTheoNgay {
    @JsonProperty("ngay")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate ngay;

    @JsonProperty("tong_tien")
    private double tongTien;
}
