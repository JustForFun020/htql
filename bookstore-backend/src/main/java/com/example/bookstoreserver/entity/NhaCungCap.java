package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "nhacungcap")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NhaCungCap extends BaseEntity{
    @Column(name = "ten_nha_cung_cap")
    private String tenNhaCungCap;
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "so_dien_thoai")
    private String soDienThoai;
    @Column(name = "mo_ta")
    private String moTa;

    @OneToMany(mappedBy = "nhaCungCap")
    @JsonManagedReference
    private List<PhieuNhap> danhSachPhieuNhap;
}
