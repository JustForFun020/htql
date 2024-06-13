package com.example.bookstoreserver.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThongKeRequest {
    private Integer nam;
    private Integer thang;
}
