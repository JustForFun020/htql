package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.KhoHangDTO;
import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.service.khohang.KhoHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("kho-hang")
public class KhoHangController {
    private final KhoHangService khoHangService;
    @GetMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getAllKhoHang(){
        try {
            List<KhoHang> khoHang = khoHangService.getAllKhoHang();
            return ResponseEntity.ok().body(khoHang);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getKhoHangById(@PathVariable Long id){
        try {
            KhoHang khoHang = khoHangService.getKhoHangById(id);
            return ResponseEntity.ok().body(khoHang);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> deleteKhoHang(@PathVariable Long id){
        try {
            String msg = khoHangService.deleteKhoHang(id);
            return ResponseEntity.ok().body(msg);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> createKhoHang(@RequestBody KhoHangDTO khoHangDTO){
        try {
            KhoHang khoHang = khoHangService.createKhoHang(khoHangDTO);
            return ResponseEntity.ok().body(khoHang);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
