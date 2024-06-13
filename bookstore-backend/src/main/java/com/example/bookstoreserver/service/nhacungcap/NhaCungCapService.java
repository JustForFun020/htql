package com.example.bookstoreserver.service.nhacungcap;

import com.example.bookstoreserver.dtos.NhaCungCapDTO;
import com.example.bookstoreserver.entity.NhaCungCap;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.NhaCungCapRepository;
import com.example.bookstoreserver.repository.PhieuNhapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NhaCungCapService implements INhaCungCapService{
    private final NhaCungCapRepository nhaCungCapRepository;
    private final PhieuNhapRepository phieuNhapRepository;


    @Override
    public List<Map<String, Object>> thongKeNhaCungCapTheoSoLuongNhap() {
        List<Object[]> thongke = nhaCungCapRepository.thongKeNhaCungCapTheoSoLuongNhap();
        // Chuyển đổi kết quả từ Object[] thành Map<String, Object>
                List<Map<String, Object>> result = thongke.stream()
                .map(record -> Map.of(
                        "tenNhaCungCap", record[0],
                        "soLuongNhap", record[1]
                ))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public NhaCungCap getNhaCungCapById(Long id) throws DataNotFoundException {
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(id).orElse(null);
        if (nhaCungCap == null){
            throw new DataNotFoundException("Nha cung cap khong ton tai");
        }
        return nhaCungCap;
    }

    @Override
    public NhaCungCap createNhaCungCap(NhaCungCapDTO nhaCungCapDTO) {
        NhaCungCap nhaCungCap = NhaCungCap.builder()
                .tenNhaCungCap(nhaCungCapDTO.getTenNhaCungCap())
                .diaChi(nhaCungCapDTO.getDiaChi())
                .soDienThoai(nhaCungCapDTO.getSoDienThoai())
                .moTa(nhaCungCapDTO.getMoTa())
                .build();
        return nhaCungCapRepository.save(nhaCungCap);
    }

    @Override
    public NhaCungCap updateNhaCungCap(Long id, NhaCungCapDTO nhaCungCapDTO) throws DataNotFoundException {
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Nhà cung cấp không tồn tại"));
        nhaCungCap.setTenNhaCungCap(nhaCungCapDTO.getTenNhaCungCap());
        nhaCungCap.setDiaChi(nhaCungCapDTO.getDiaChi());
        nhaCungCap.setSoDienThoai(nhaCungCapDTO.getSoDienThoai());
        nhaCungCap.setMoTa(nhaCungCapDTO.getMoTa());
        return nhaCungCapRepository.save(nhaCungCap);
    }
}
