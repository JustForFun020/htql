package com.example.bookstoreserver.service.sanpham;

import com.example.bookstoreserver.dtos.ImageSanPhamDTO;
import com.example.bookstoreserver.dtos.SanPhamDTO;
import com.example.bookstoreserver.dtos.TieuChiPhanLoaiDTO;
import com.example.bookstoreserver.entity.DanhMucSanPham;
import com.example.bookstoreserver.entity.HoaDon;
import com.example.bookstoreserver.entity.ImageSanPham;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.exceptions.InvalidParamException;
import com.example.bookstoreserver.repository.DanhMucSanPhamRepository;
import com.example.bookstoreserver.repository.HoaDonRepository;
import com.example.bookstoreserver.repository.ImageSanPhamRepository;
import com.example.bookstoreserver.repository.SanPhamRepository;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SanPhamService implements ISanPhamService{
    private final SanPhamRepository sanPhamRepository;
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;
    private final ImageSanPhamRepository imageSanPhamRepository;
    private final HoaDonRepository hoaDonRepository;
    @Override
    @Transactional
    public SanPham createSanPham(SanPhamDTO sanPhamDTO) throws Exception {
        DanhMucSanPham existDMSP = danhMucSanPhamRepository.findById(sanPhamDTO.getDanhMucSanPhamId()).orElse(null);
        if (existDMSP == null){
            throw new DataNotFoundException("DMSP khong ton tai");
        }
        SanPham sanPham = SanPham.builder()
                .tenSanPham(sanPhamDTO.getTenSanPham())
                .soLuong(sanPhamDTO.getSoLuong())
                .giaBan(sanPhamDTO.getGiaBan())
                .moTa(sanPhamDTO.getMoTa())
                .imgHero(sanPhamDTO.getImgHero())
                .hoaDon(null)
                .danhMucSanPham(existDMSP)
                .ngayTao(LocalDate.now())
                .ngayCapNhat(LocalDate.now())
                .build();
        return sanPhamRepository.save(sanPham);
    }

    @Override
    @Transactional
    public SanPham updateSanPham(Long id, SanPhamDTO sanPhamDTO) throws Exception {
        SanPham existSanPham = sanPhamRepository.findById(id).orElseThrow(() -> new DataNotFoundException("San Pham khong ton tai"));
        if (existSanPham != null){
            DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(sanPhamDTO.getDanhMucSanPhamId()).orElseThrow(()->new DataNotFoundException("DMSP khong ton tai"));
            HoaDon hoaDon = hoaDonRepository.findById(sanPhamDTO.getHoaDonId()).orElseThrow(()->new DataNotFoundException("hoa don khong ton tai"));
            existSanPham.setTenSanPham(sanPhamDTO.getTenSanPham());
            existSanPham.setSoLuong(sanPhamDTO.getSoLuong());
            existSanPham.setGiaBan(sanPhamDTO.getGiaBan());
            existSanPham.setMoTa(sanPhamDTO.getMoTa());
            existSanPham.setImgHero(sanPhamDTO.getImgHero());
            existSanPham.setHoaDon(hoaDon);
            existSanPham.setDanhMucSanPham(danhMucSanPham);
            existSanPham.setNgayCapNhat(LocalDate.now());
        }
        return sanPhamRepository.save(existSanPham);
    }

    @Override
    @Transactional
    public void deleteSanPham(Long id) {
        SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
        if (sanPham != null){
            sanPhamRepository.delete(sanPham);
        }
    }

    @Override
    public Page<SanPhamResponse> getAllSanPhams(PageRequest pageRequest) {
        Page<SanPham> sanPhamPage = sanPhamRepository.findAll(pageRequest);
        return sanPhamPage.map(SanPhamResponse::fromSanPham);
    }

    @Override
    public ImageSanPham createImageSanPham(Long sanPhamId, ImageSanPhamDTO imageSanPhamDTO) throws Exception {
        SanPham sanPham = sanPhamRepository.findById(sanPhamId).orElseThrow(()->new DataNotFoundException("khong tin thay san pham voi id = " + imageSanPhamDTO.getSanPhamId()));
        ImageSanPham imageSanPham = ImageSanPham.builder()
                .sanPham(sanPham)
                .imageUrl(imageSanPhamDTO.getImageUrl())
                .build();
        //Ko cho thêm quá 5 ảnh 1 sp
        int size = imageSanPhamRepository.findBySanPhamId(sanPhamId).size();
        if (size >= ImageSanPham.MAXIMUM_IMAGES_PER_PRODUCT){
            throw new InvalidParamException("Number up image must be <= 5" + ImageSanPham.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        return imageSanPhamRepository.save(imageSanPham);
    }

    @Override
    public SanPham getSanPhamById(Long id) throws DataNotFoundException {
        SanPham sanPham = sanPhamRepository.findById(id).orElse(null);
        if (sanPham == null){
            throw new DataNotFoundException("san pham khong ton tai");
        }
        return sanPham;
    }

    @Override
    public List<SanPham> timSanPhamTheoTieuChiPhanLoai(TieuChiPhanLoaiDTO tieuChiPhanLoaiDTO) {
        List<String> danhSachTenTheLoai = tieuChiPhanLoaiDTO.getDanhSachTenTieuChi();
        long soLuongTieuChi = danhSachTenTheLoai.size();
        return sanPhamRepository.timSanPhamTheoTieuChiPhanLoai(danhSachTenTheLoai, soLuongTieuChi);
    }
}
