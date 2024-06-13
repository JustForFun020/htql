package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TongTienBanDuocThangDTO {
    private int nam;
    private int thang;
    @JsonProperty("tong_tien_ban_duoc")
    private Double tongTienBanDuoc;
}
