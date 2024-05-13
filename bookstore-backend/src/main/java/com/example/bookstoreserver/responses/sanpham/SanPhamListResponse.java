package com.example.bookstoreserver.responses.sanpham;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SanPhamListResponse {
    private List<SanPhamResponse> sanPhamResponses;
    private int tongSoPage;
}
