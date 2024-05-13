package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "phieunhap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhieuNhap extends BaseEntity{
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "gia_nhap")
    private double giaNhap;
    @Column(name = "ngay_nhap")
    private LocalDate ngayNhap;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoidung_id", foreignKey = @ForeignKey(name = "fk_phieunhap_nguoidung"))
    @JsonBackReference
    private NguoiDung nguoiDung;

    @OneToMany(mappedBy = "phieuNhap")
    @JsonManagedReference
    private List<NhaCungCap> danhSachNhaCungCap;
}
