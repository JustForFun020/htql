package com.example.bookstoreserver.service.nguoidung;

import com.example.bookstoreserver.dtos.LoginDTO;
import com.example.bookstoreserver.dtos.NguoiDungDTO;
import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.responses.nguoidung.ChangePasswordRequest;
import com.example.bookstoreserver.responses.nguoidung.ForgotPasswordRequest;
import com.example.bookstoreserver.responses.nguoidung.LoginRequest;

public interface INguoiDungService {
    LoginDTO login(LoginRequest loginRequest) throws Exception;
    String register(NguoiDungDTO nguoiDungDTO) throws Exception;
    void saveUser(NguoiDungDTO nguoiDungDTO) throws Exception;
    String changePassword(int userId, ChangePasswordRequest changePasswordRequest) throws Exception;
    String forgotPassword(ForgotPasswordRequest forgotPasswordRequest)throws Exception;
}
