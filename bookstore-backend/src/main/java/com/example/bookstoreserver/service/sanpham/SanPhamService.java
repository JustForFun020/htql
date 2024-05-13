package com.example.bookstoreserver.service.sanpham;

import com.example.bookstoreserver.dtos.SanPhamDTO;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.repository.SanPhamRepository;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SanPhamService implements ISanPhamService{
    private final SanPhamRepository sanPhamRepository;
    @Override
    public SanPham createSanPham(SanPhamDTO sanPhamDTO) throws Exception {
        return null;
    }

    @Override
    public SanPham updateSanPham(int id, SanPhamDTO sanPhamDTO) throws Exception {
        return null;
    }

    @Override
    public void deleteSanPham(int id) {

    }

    @Override
    public Page<SanPhamResponse> getAllSanPhams(PageRequest pageRequest) {
        Page<SanPham> sanPhamPage = sanPhamRepository.findAll(pageRequest);
        return sanPhamPage.map(SanPhamResponse::fromSanPham);
    }
}
