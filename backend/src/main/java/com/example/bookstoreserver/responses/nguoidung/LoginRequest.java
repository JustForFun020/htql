package com.example.bookstoreserver.responses.nguoidung;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginRequest {
    @JsonProperty("email")
    private String email;
    @JsonProperty("mat_khau")
    private String matKhau;
}
