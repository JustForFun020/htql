package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "imagesanpham")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageSanPham extends BaseEntity{
    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sanpham_id", foreignKey = @ForeignKey(name = "fk_imgsp_sanpham"))
    @JsonBackReference
    private SanPham sanPham;
}
