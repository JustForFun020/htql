package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TongTienBanDuocDTO {
    @JsonProperty("ngay_ban")
    private LocalDate ngayBan;
    @JsonProperty("tong_tien_ban_duoc")
    private Double tongTienBanDuoc;
}
