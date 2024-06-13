package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.NhaCungCapDTO;
import com.example.bookstoreserver.entity.NhaCungCap;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.service.nhacungcap.NhaCungCapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("nhacungcap")
public class NhaCungCapController {
    private final NhaCungCapService nhaCungCapService;
    @GetMapping("/thongke")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<Map<String, Object>>> thongKeNhaCungCapTheoSoLuongNhap() {
        List<Map<String, Object>> thongKeList = nhaCungCapService.thongKeNhaCungCapTheoSoLuongNhap();
        return ResponseEntity.ok(thongKeList);
    }
    @GetMapping("/nhacungcap/{id}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> getNhaCungCapById(@PathVariable Long id) throws DataNotFoundException {
        NhaCungCap nhaCungCap = nhaCungCapService.getNhaCungCapById(id);
        return ResponseEntity.ok().body(nhaCungCap);
    }
    @PostMapping("/them-ncc")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<NhaCungCap> themMoiNhaCungCap(@RequestBody NhaCungCapDTO nhaCungCapDTO) {
        NhaCungCap nhaCungCap = nhaCungCapService.createNhaCungCap(nhaCungCapDTO);
        return ResponseEntity.ok(nhaCungCap);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<NhaCungCap> capNhatNhaCungCap(@PathVariable Long id, @RequestBody NhaCungCapDTO nhaCungCapDTO) throws DataNotFoundException {
        NhaCungCap nhaCungCap = nhaCungCapService.updateNhaCungCap(id, nhaCungCapDTO);
        return ResponseEntity.ok(nhaCungCap);
    }
}
