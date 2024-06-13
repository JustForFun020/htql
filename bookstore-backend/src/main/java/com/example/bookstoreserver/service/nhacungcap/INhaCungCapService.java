package com.example.bookstoreserver.service.nhacungcap;

import com.example.bookstoreserver.dtos.NhaCungCapDTO;
import com.example.bookstoreserver.entity.NhaCungCap;
import com.example.bookstoreserver.exceptions.DataNotFoundException;

import java.util.List;
import java.util.Map;

public interface INhaCungCapService {
    List<Map<String, Object>> thongKeNhaCungCapTheoSoLuongNhap();
    NhaCungCap getNhaCungCapById(Long id) throws DataNotFoundException;
    NhaCungCap createNhaCungCap(NhaCungCapDTO nhaCungCapDTO);
    NhaCungCap updateNhaCungCap(Long id, NhaCungCapDTO nhaCungCapDTO) throws DataNotFoundException;
}
