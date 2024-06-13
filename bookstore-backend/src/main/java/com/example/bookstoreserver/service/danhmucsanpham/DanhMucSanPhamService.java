package com.example.bookstoreserver.service.danhmucsanpham;

import com.example.bookstoreserver.dtos.DanhMucSanPhamDTO;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.entity.KhoHang;
import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.DanhMucSanPhamRepository;
import com.example.bookstoreserver.repository.KhoHangRepository;
import com.example.bookstoreserver.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucSanPhamService implements IDanhMucSanPhamService{
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;
    private final ModelMapper modelMapper;
    private final NguoiDungRepository nguoiDungRepository;
    private final KhoHangRepository khoHangRepository;

    @Override
    public List<DanhMucSanPhamDTO> getAllDanhMuc() {
        List<DanhMucSanPham> danhMucSanPhamList = danhMucSanPhamRepository.findAll();
        List<DanhMucSanPhamDTO> danhMucSanPhamDTOS = danhMucSanPhamList.stream()
                .map(danhMucSanPham -> modelMapper.map(danhMucSanPham, DanhMucSanPhamDTO.class))
                .toList();
        return danhMucSanPhamDTOS;
    }

    @Override
    public DanhMucSanPham createDanhMucSanPham(DanhMucSanPhamDTO danhMucSanPhamDTO) throws DataNotFoundException {
        NguoiDung nguoiDung = nguoiDungRepository.findById(danhMucSanPhamDTO.getNguoiDungId())
                .orElseThrow(()->new DataNotFoundException("nguoi dung khong ton tai"));
        KhoHang khoHang = khoHangRepository.findById(danhMucSanPhamDTO.getKhoHangId())
                .orElseThrow(()->new DataNotFoundException("kho hang khong ton tai"));
        DanhMucSanPham danhMucSanPham = DanhMucSanPham.builder()
                .ten(danhMucSanPhamDTO.getTen())
                .soLuong(danhMucSanPhamDTO.getSoLuong())
                .nguoiDung(nguoiDung)
                .khoHang(khoHang)
                .build();
        return danhMucSanPhamRepository.save(danhMucSanPham);
    }

    @Override
    public String deleteDanhMucSanPham(Long id) throws DataNotFoundException {
        DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("danh muc khong ton tai"));
        danhMucSanPhamRepository.delete(danhMucSanPham);
        return "da xoa thanh cong danh muc san pham co id = " + id;
    }
}
