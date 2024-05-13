package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "khohang")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KhoHang extends BaseEntity{
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "so_luong_ton_kho")
    private int soLuongTonKho;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cuahang_id", foreignKey = @ForeignKey(name = "fk_khohang_cuahang"))
    @JsonBackReference
    private CuaHang cuaHang;

    @OneToMany(mappedBy = "khoHang")
    @JsonManagedReference
    private List<DanhMucSanPham> danhMucSanPhams;
}
