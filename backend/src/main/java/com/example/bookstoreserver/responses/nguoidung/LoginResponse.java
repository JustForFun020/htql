package com.example.bookstoreserver.responses.nguoidung;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
public class LoginResponse {
    @JsonProperty("message")
    private String message;
    @JsonProperty("token")
    private String token;
}
