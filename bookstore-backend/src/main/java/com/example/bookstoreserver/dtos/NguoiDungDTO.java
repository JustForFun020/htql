package com.example.bookstoreserver.dtos;

import com.example.bookstoreserver.entity.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungDTO {
    @JsonProperty("email")
    private String email;
    @JsonProperty("mat_khau")
    private String matKhau;
    @JsonProperty("nhap_lai_mat_khau")
    private String nhapLaiMatKhau;
    @JsonProperty("ho_ten")
    private String hoTen;
    @JsonProperty("dia_chi")
    private String diaChi;
    @JsonProperty("ngay_sinh")
    private Date ngaySinh;
    @JsonProperty("so_dien_thoai")
    private String soDienThoai;
//    @JsonProperty("role_id")
//    private Long roleId;
}
