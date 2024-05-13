package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageSanPhamDTO {
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("sanpham_id")
    private Long sanPhamId;
}
