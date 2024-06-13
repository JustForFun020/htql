package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.entity.PhieuNhap;
import com.example.bookstoreserver.entity.TieuChiPhanLoai;
import com.example.bookstoreserver.service.tieuchiphanloai.TieuChiPhanLoaiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("tieuchiphanloai")
public class TieuChiPhanLoaiController {
    private final TieuChiPhanLoaiService tieuChiPhanLoaiService;
    @GetMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getAllTieuChiPhanLoai(){
        try {
            List<TieuChiPhanLoai> tieuChiPhanLoais = tieuChiPhanLoaiService.getAllTieuChiPhanLoai();
            return ResponseEntity.ok().body(tieuChiPhanLoais);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
