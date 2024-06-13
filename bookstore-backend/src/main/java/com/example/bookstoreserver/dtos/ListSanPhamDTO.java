package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListSanPhamDTO {
    @JsonProperty("sanpham_id")
    private Long sanPhamId;
    @JsonProperty("so_luong")
    private int soLuong;
}
