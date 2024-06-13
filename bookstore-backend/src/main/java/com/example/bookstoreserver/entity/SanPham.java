package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sanpham")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPham extends BaseEntity{
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "gia_ban")
    private double giaBan;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "img_hero")
    private String imgHero;
    @Column(name = "ngay_tao")
    private LocalDate ngayTao;
    @Column(name = "ngay_cap_nhat")
    private LocalDate ngayCapNhat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hoadon_id", foreignKey = @ForeignKey(name = "fk_sanpham_hoadon"))
    @JsonBackReference
    private HoaDon hoaDon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "danhmucsp_id", foreignKey = @ForeignKey(name = "fk_sanpham_danhmucsp"))
    @JsonBackReference
    private DanhMucSanPham danhMucSanPham;

    @OneToMany(mappedBy = "sanPham")
    @JsonManagedReference
    private List<ImageSanPham> danhSachImage;
}
