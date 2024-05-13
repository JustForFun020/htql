package com.example.bookstoreserver.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LoginDTO {
    @JsonProperty("email")
    private String email;
    @JsonProperty("mat_khau")
    private String matKhau;
    @JsonProperty("role_id")
    private List<String> role;
    @JsonProperty("token")
    private String token;
}
