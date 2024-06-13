package com.example.bookstoreserver.service.nguoidung;

import com.example.bookstoreserver.component.JwtTokenUtils;
import com.example.bookstoreserver.dtos.LoginDTO;
import com.example.bookstoreserver.dtos.NguoiDungDTO;
import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.entity.Role;
import com.example.bookstoreserver.exceptions.DataIntegrityViolationException;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.NguoiDungRepository;
import com.example.bookstoreserver.repository.RoleRepository;
import com.example.bookstoreserver.responses.nguoidung.ChangePasswordRequest;
import com.example.bookstoreserver.responses.nguoidung.ForgotPasswordRequest;
import com.example.bookstoreserver.responses.nguoidung.LoginRequest;
import com.example.bookstoreserver.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NguoiDungService implements INguoiDungService{
    private final NguoiDungRepository nguoiDungRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmailService emailService;
    private final JwtTokenUtils jwtTokenUtils;
    @Override
    public LoginDTO login(LoginRequest loginRequest) throws Exception {
        Optional<NguoiDung> nguoiDungOptional = nguoiDungRepository.findByEmail(loginRequest.getEmail());
        if (nguoiDungOptional.isEmpty()){
            throw new DataNotFoundException("Nguoi dung khong ton tai");
        }
        NguoiDung nguoiDung = nguoiDungOptional.get();
        if (!passwordEncoder.matches(loginRequest.getMatKhau(), nguoiDung.getMatKhau())){
            throw new BadCredentialsException("Mat khau khong chinh xac");
        }
        //Chuyền email,password, role vào authenticationToken để xac thực ngươi dùng
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getMatKhau(),
                nguoiDung.getAuthorities()
        );
        //Xác thực người dùng
        authenticationManager.authenticate(authenticationToken);
        // Tạo danh sách vai trò từ đối tượng NguoiDung
        List<String> roles = nguoiDung.getAuthorities().stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());

        String token = jwtTokenUtils.generateToken(nguoiDung);

        LoginDTO loginDTO = LoginDTO.builder()
                .email(loginRequest.getEmail())
                .matKhau(loginRequest.getMatKhau())
                .role(roles)
                .token(token)
                .build();
        return loginDTO;
    }

    @Override
    public String register(NguoiDungDTO nguoiDungDTO) throws Exception {
        String email = nguoiDungDTO.getEmail();
        if (nguoiDungRepository.existsByEmail(email)){
            throw new DataIntegrityViolationException("email đã tồn tại");
        }
        emailService.sendConfirmEmail(email);
        return "Mã xác minh đã được gửi đến email của bạn";
    }

    @Override
    public void saveUser(NguoiDungDTO nguoiDungDTO) throws Exception {
        String email = nguoiDungDTO.getEmail();
        if (nguoiDungRepository.existsByEmail(email)){
            throw new Exception("email da ton tai");
        }
        Role role = roleRepository.findById(2L).orElseThrow(()->new IllegalStateException("Khong tim thay role"));
        NguoiDung nguoiDungMoi = NguoiDung.builder()
                .email(nguoiDungDTO.getEmail())
                .matKhau(nguoiDungDTO.getMatKhau())
                .hoTen(nguoiDungDTO.getHoTen())
                .diaChi(nguoiDungDTO.getDiaChi())
                .soDienThoai(nguoiDungDTO.getSoDienThoai())
                .ngaySinh(nguoiDungDTO.getNgaySinh())
                .role(role)
                .email(email)
                .build();
        String matkhau = nguoiDungDTO.getMatKhau();
        String encodeMatKhau = passwordEncoder.encode(matkhau);
        nguoiDungMoi.setMatKhau(encodeMatKhau);
        nguoiDungRepository.save(nguoiDungMoi);
    }

    @Override
    public String changePassword(int userId, ChangePasswordRequest changePasswordRequest) throws Exception {
        return null;
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest forgotPasswordRequest) throws Exception {
        return null;
    }
}
