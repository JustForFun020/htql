package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.responses.sanpham.SanPhamListResponse;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import com.example.bookstoreserver.service.sanpham.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("sanpham")
public class SanPhamController {
    private final SanPhamService sanPhamService;
    @GetMapping("/all-sanpham")
    public ResponseEntity<SanPhamListResponse> getAllSanPhams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit){
        // Tạo Pageable từ thông tin trang và giới hạn
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                //Sort.by("createdAt").descending()
                Sort.by("id").ascending()
        );
        Page<SanPhamResponse> sanPhamPage = sanPhamService.getAllSanPhams(pageRequest);
        int tongSoPage = sanPhamPage.getTotalPages();
        List<SanPhamResponse> sanPhamResponses = sanPhamPage.getContent();
        return ResponseEntity.ok(SanPhamListResponse
                .builder()
                .sanPhamResponses(sanPhamResponses)
                .tongSoPage(tongSoPage)
                .build());
    }
}
