package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "tieuchiphanloai")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TieuChiPhanLoai extends BaseEntity{
    @Column(name = "ten_the_loai")
    private String tenTheLoai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loaisp_id", foreignKey = @ForeignKey(name = "fk_theloai_loaisp"))
    @JsonBackReference
    private DanhMucSanPham danhMucSanPham;
}
