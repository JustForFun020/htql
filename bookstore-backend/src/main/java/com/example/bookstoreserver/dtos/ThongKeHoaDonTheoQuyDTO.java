package com.example.bookstoreserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongKeHoaDonTheoQuyDTO {
    private int quy;
    private int nam;
    private double tongTien;
}
