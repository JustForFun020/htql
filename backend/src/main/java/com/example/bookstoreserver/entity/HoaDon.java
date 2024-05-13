package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hoadon")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDon extends BaseEntity{
    @Column(name = "ten_hoa_don")
    private String tenHoaDon;
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;
    @Column(name = "tong_tien")
    private double tongTien;
    @Column(name = "loai_thanh_toan")
    private String loaiThanhToan;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoidung_id", foreignKey = @ForeignKey(name = "fk_hoadon_nguoidung"))
    @JsonBackReference
    private NguoiDung nguoiDung;

    @OneToMany(mappedBy = "hoaDon")
    @JsonManagedReference
    private List<SanPham> danhSachSanPham;
}
