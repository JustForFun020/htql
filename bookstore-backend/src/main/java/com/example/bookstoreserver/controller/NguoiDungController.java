package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.LoginDTO;
import com.example.bookstoreserver.dtos.NguoiDungDTO;
import com.example.bookstoreserver.entity.Email;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.EmailRepository;
import com.example.bookstoreserver.responses.nguoidung.LoginRequest;
import com.example.bookstoreserver.responses.nguoidung.LoginResponse;
import com.example.bookstoreserver.service.email.EmailService;
import com.example.bookstoreserver.service.nguoidung.NguoiDungService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("nguoidung")
@RequiredArgsConstructor
public class NguoiDungController {
    private final NguoiDungService nguoiDungService;
    private final EmailService emailService;
    private final EmailRepository emailRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody NguoiDungDTO nguoiDungDTO) throws Exception{
        try {
            String msg = nguoiDungService.register(nguoiDungDTO);
            return ResponseEntity.ok().body(msg);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/confirm-register")
    public ResponseEntity<?> confirmRegister(@RequestParam String confirmCode, @RequestBody NguoiDungDTO nguoiDungDTO) throws Exception{
        try {
            boolean isConfirm = emailService.confirmEmail(confirmCode);
            Email confirmEmail = emailRepository.findEmailByCode(confirmCode);
            if (isConfirm){
                nguoiDungService.saveUser(nguoiDungDTO);
                emailRepository.delete(confirmEmail);
            }
            return ResponseEntity.ok().body("Đăng ký thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) throws Exception{
        try {
            LoginDTO loginDTO = nguoiDungService.login(loginRequest);
            return ResponseEntity.ok(LoginResponse.builder()
                    .message("Dang nhap thanh cong")
                    .token(loginDTO.getToken())
                    .build());
        } catch (DataNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(LoginResponse.builder()
                            .message("Email khong ton tai")
                            .token(null)
                    .build());
        }catch (AuthenticationException e) {
            // Sai mật khẩu hoặc thông tin đăng nhập không hợp lệ
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(LoginResponse.builder()
                    .message("Sai mat khau")
                    .token(null)
                    .build());
        }
    }
}
