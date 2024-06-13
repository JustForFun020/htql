package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.HoaDonDTO;
import com.example.bookstoreserver.dtos.ThongKeRequest;
import com.example.bookstoreserver.dtos.TongTienBanDuocDTO;
import com.example.bookstoreserver.dtos.TongTienBanDuocThangDTO;
import com.example.bookstoreserver.entity.HoaDon;
import com.example.bookstoreserver.service.hoadon.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("hoa-don")
public class HoaDonController {
    private final HoaDonService hoaDonService;
    @PostMapping("/tao-hoa-don")
    @PreAuthorize("hasRole('NHANVIEN')")
    public ResponseEntity<?> createHoaDon(@RequestBody HoaDonDTO hoaDonDTO) throws Exception {
        HoaDon hoaDon = hoaDonService.createHoaDon(hoaDonDTO);
        return ResponseEntity.ok().body(hoaDon);
    }
    @PutMapping("/update-hoadon")
    @PreAuthorize("hasRole('NHANVIEN')")
    public ResponseEntity<?> updateHoaDon(@RequestParam Long id, @RequestBody HoaDonDTO hoaDonDTO) throws Exception {
        HoaDon hoaDon = hoaDonService.updateHoaDon(id, hoaDonDTO);
        return ResponseEntity.ok().body(hoaDon);
    }
    @GetMapping("/all")
    @PreAuthorize("hasRole('NHANVIEN')")
    public ResponseEntity<?> getAllHoaDon(){
        try {
            return ResponseEntity.ok().body(hoaDonService.getAllHoaDon());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('NHANVIEN')")
    public ResponseEntity<?> findHoaDonById(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(hoaDonService.findHoaDonById(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('NHANVIEN')")
    public ResponseEntity<?> deleteHoaDon(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(hoaDonService.deleteHoaDon(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
