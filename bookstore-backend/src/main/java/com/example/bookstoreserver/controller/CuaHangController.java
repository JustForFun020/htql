package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.CuaHangDTO;
import com.example.bookstoreserver.dtos.DanhMucSanPhamDTO;
import com.example.bookstoreserver.entity.CuaHang;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.service.cuahang.CuaHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cuahang")
@RequiredArgsConstructor
public class CuaHangController {
    private final CuaHangService cuaHangService;
    @PostMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> createCuaHang(@RequestBody CuaHangDTO cuaHangDTO){
        try {
            CuaHang cuaHang = cuaHangService.createCuaHang(cuaHangDTO);
            return ResponseEntity.ok().body(cuaHang);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> deleteCuaHang(@RequestParam Long id){
        try {
            String msg = cuaHangService.deleteCuaHang(id);
            return ResponseEntity.ok().body(msg);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
