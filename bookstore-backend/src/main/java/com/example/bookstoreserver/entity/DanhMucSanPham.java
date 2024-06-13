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
@Table(name = "danhmucsanpham")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DanhMucSanPham extends BaseEntity{
    private String ten;
    private int soLuong;
    @OneToMany(mappedBy = "danhMucSanPham")
    @JsonManagedReference
    private List<SanPham> danhSachSanPham;

    @OneToMany(mappedBy = "danhMucSanPham")
    @JsonManagedReference
    private List<TieuChiPhanLoai> danhSachTieuChi;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "khohang_id", foreignKey = @ForeignKey(name = "fk_danhmucsp_khohang"))
    @JsonBackReference
    private KhoHang khoHang;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoidung_id", foreignKey = @ForeignKey(name = "fk_danhmucsp_nguoidung"))
    @JsonBackReference
    private NguoiDung nguoiDung;
}
