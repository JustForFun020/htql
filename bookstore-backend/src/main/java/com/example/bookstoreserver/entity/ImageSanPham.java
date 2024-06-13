package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "imagesanpham")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageSanPham extends BaseEntity{
    public static final int MAXIMUM_IMAGES_PER_PRODUCT = 5;
    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sanpham_id", foreignKey = @ForeignKey(name = "fk_imgsp_sanpham"))
    @JsonBackReference
    private SanPham sanPham;
}
