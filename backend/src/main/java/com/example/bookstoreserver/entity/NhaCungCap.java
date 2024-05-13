package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nhacungcap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhaCungCap extends BaseEntity{
    @Column(name = "ten_nha_cung_cap")
    private String tenNhaCungCap;
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "so_dien_thoai")
    private String soDienThoai;
    @Column(name = "mo_ta")
    private String moTa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "phieunhap_id", foreignKey = @ForeignKey(name = "fk_nhacungcap_phieunhap"))
    @JsonBackReference
    private PhieuNhap phieuNhap;
}
