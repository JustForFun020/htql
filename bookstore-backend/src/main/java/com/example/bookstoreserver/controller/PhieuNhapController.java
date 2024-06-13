package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.PhieuNhapDTO;
import com.example.bookstoreserver.entity.PhieuNhap;
import com.example.bookstoreserver.service.phieunhap.PhieuNhapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("phieunhap")
@RequiredArgsConstructor
public class PhieuNhapController {
    private final PhieuNhapService phieuNhapService;
    @GetMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getAllPhieuNhap(){
        try {
            List<PhieuNhap> phieuNhap = phieuNhapService.getAllPhieuNhap();
            return ResponseEntity.ok().body(phieuNhap);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getPhieuNhapById(@PathVariable Long id){
        try {
            PhieuNhap phieuNhap = phieuNhapService.getPhieuNhapById(id);
            return ResponseEntity.ok().body(phieuNhap);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> createPhieuNhap(@RequestBody PhieuNhapDTO phieuNhapDTO){
        try {
            PhieuNhap phieuNhap = phieuNhapService.createPhieuNhap(phieuNhapDTO);
            return ResponseEntity.ok().body(phieuNhap);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
