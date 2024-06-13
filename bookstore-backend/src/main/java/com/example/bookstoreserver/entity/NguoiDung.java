package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "nguoidung")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDung extends BaseEntity implements UserDetails {
    @Column(name = "email")
    private String email;
    @Column(name = "mat_khau")
    private String matKhau;
    @Column(name = "ho_ten")
    private String hoTen;
    @Column(name = "dia_chi")
    private String diaChi;
    @Column(name = "ngay_sinh")
    private Date ngaySinh;
    @Column(name = "so_dien_thoai", length = 10)
    private String soDienThoai;

    @OneToMany(mappedBy = "nguoiDung")
    @JsonManagedReference
    private List<HoaDon> danhSachHoaDon;

    @OneToMany(mappedBy = "nguoiDung")
    @JsonManagedReference
    private List<DanhMucSanPham> danhMucSanPhams;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", foreignKey = @ForeignKey(name = "fk_nguoidung_role"))
    @JsonBackReference
    private Role role;

    @OneToMany(mappedBy = "nguoiDung")
    @JsonManagedReference
    private List<PhieuNhap> danhSachPhieuNhap;

    @OneToMany(mappedBy = "nguoiDung" , cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Email> danhSachEmail;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList =  new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("ROLE_" + getRole().getName().toUpperCase()));
        return authorityList;
    }

    @Override
    public String getPassword() {
        return matKhau;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
