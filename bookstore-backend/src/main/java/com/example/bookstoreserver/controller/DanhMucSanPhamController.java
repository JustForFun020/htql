package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.DanhMucSanPhamDTO;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.service.danhmucsanpham.DanhMucSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("danh-muc-san-pham")
public class DanhMucSanPhamController {
    private final DanhMucSanPhamService danhMucSanPhamService;
    @GetMapping("/all")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getAllDanhMuc(){
        try {
            List<DanhMucSanPhamDTO> danhMucSanPhamList = danhMucSanPhamService.getAllDanhMuc();
            return ResponseEntity.ok().body(danhMucSanPhamList);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> createDanhMucSanPham(@RequestBody DanhMucSanPhamDTO danhMucSanPhamDTO){
        try {
            DanhMucSanPham danhMucSanPham = danhMucSanPhamService.createDanhMucSanPham(danhMucSanPhamDTO);
            return ResponseEntity.ok().body(danhMucSanPham);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> deleteDanhMucSanPham(@RequestParam Long id){
        try {
            String msg = danhMucSanPhamService.deleteDanhMucSanPham(id);
            return ResponseEntity.ok().body(msg);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
