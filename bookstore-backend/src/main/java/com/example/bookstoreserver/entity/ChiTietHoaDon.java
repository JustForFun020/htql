package com.example.bookstoreserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chitiethoadon")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChiTietHoaDon extends BaseEntity{
    @Column(name = "ten_san_pham")
    private String tenSanPham;
    @Column(name = "so_luong")
    private int soLuong;

    @ManyToOne
    @JoinColumn(name = "hoadon_id", foreignKey = @ForeignKey(name = "fk_chitiethoadon_hoadon"))
    private HoaDon hoaDon;
}
