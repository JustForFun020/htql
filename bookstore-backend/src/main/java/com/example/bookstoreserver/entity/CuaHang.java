package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "cuahang")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CuaHang extends BaseEntity{
    @Column(name = "ten_cua_hang")
    private String tenCuaHang;
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "so_dien_thoai", length = 10)
    private String soDienThoai;
    @Column(name = "mo_ta")
    private String moTa;

    @OneToMany(mappedBy = "cuaHang", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<KhoHang> danhSachKhoHang;
}
