package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity{
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private List<NguoiDung> danhSachNguoiDung;


    public static String QUANLY = "QUANLY";
    public static String NHANVIEN = "NHANVIEN";
}
