package com.example.bookstoreserver.service.tieuchiphanloai;

import com.example.bookstoreserver.entity.TieuChiPhanLoai;
import com.example.bookstoreserver.repository.TieuChiPhanLoaiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TieuChiPhanLoaiService implements ITieuChiPhanLoaiService{
    private final TieuChiPhanLoaiRepository tieuChiPhanLoaiRepository;

    @Override
    public List<TieuChiPhanLoai> getAllTieuChiPhanLoai() {
        return tieuChiPhanLoaiRepository.findAll();
    }
}
