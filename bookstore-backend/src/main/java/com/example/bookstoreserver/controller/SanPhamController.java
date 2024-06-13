package com.example.bookstoreserver.controller;

import com.example.bookstoreserver.dtos.ImageSanPhamDTO;
import com.example.bookstoreserver.dtos.SanPhamDTO;
import com.example.bookstoreserver.dtos.TieuChiPhanLoaiDTO;
import com.example.bookstoreserver.entity.ImageSanPham;
import com.example.bookstoreserver.entity.SanPham;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.responses.sanpham.SanPhamListResponse;
import com.example.bookstoreserver.responses.sanpham.SanPhamResponse;
import com.example.bookstoreserver.service.sanpham.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("sanpham")
public class SanPhamController {
    private final SanPhamService sanPhamService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getSanPhamById(@PathVariable Long id) throws DataNotFoundException {
        SanPham sanPham = sanPhamService.getSanPhamById(id);
        return ResponseEntity.ok().body(sanPham);
    }
    @GetMapping("/all-sanpham")
    public ResponseEntity<SanPhamListResponse> getAllSanPhams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit){
        // Tạo Pageable từ thông tin trang và giới hạn
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                //Sort.by("createdAt").descending()
                Sort.by("id").ascending()
        );
        Page<SanPhamResponse> sanPhamPage = sanPhamService.getAllSanPhams(pageRequest);
        int tongSoPage = sanPhamPage.getTotalPages();
        List<SanPhamResponse> sanPhamResponses = sanPhamPage.getContent();
        return ResponseEntity.ok(SanPhamListResponse
                .builder()
                .sanPhamResponses(sanPhamResponses)
                .tongSoPage(tongSoPage)
                .build());
    }
    @PostMapping
    public ResponseEntity<?> createSanPham(@RequestBody SanPhamDTO sanPhamDTO) throws Exception {
        try {
            SanPham sanPham = sanPhamService.createSanPham(sanPhamDTO);
            return ResponseEntity.ok().body(sanPham);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping
    public ResponseEntity<?> updateSanPham(@RequestParam Long id, @RequestBody SanPhamDTO sanPhamDTO) throws Exception {
        try {
            SanPham sanPham = sanPhamService.updateSanPham(id,sanPhamDTO);
            return ResponseEntity.ok().body(sanPham);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteSanPham(@RequestParam Long id) throws Exception {
        try {
            sanPhamService.deleteSanPham(id);
            return ResponseEntity.ok().body(String.format("Xoa thanh cong san pham co id = %d", id));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/tim-theo-tieu-chi")
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<List<SanPham>> timSanPhamTheoTieuChiPhanLoai(@RequestBody TieuChiPhanLoaiDTO tieuChiPhanLoaiDTO) {
        List<SanPham> danhSachSanPham = sanPhamService.timSanPhamTheoTieuChiPhanLoai(tieuChiPhanLoaiDTO);
        return ResponseEntity.ok(danhSachSanPham);
    }
    @PostMapping(value = "uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('QUANLY')")
    public ResponseEntity<?> uploadImages(@PathVariable("id") Long productId, @ModelAttribute("files") List<MultipartFile> files) throws IOException, DataNotFoundException {
        try {
            SanPham sanPham = sanPhamService.getSanPhamById(productId);
            files = files == null ? new ArrayList<MultipartFile>() : files;
            if(files.size() > ImageSanPham.MAXIMUM_IMAGES_PER_PRODUCT) {
                return ResponseEntity.badRequest().body("khong duoc upload qua 5 anh");
            }
            List<ImageSanPham> imageSanPhams = new ArrayList<>();
            for (MultipartFile file : files){
                if (file.getSize()==0){
                    continue;
                }
                //Kiểm tra kích thước và định dạng file
                if (file.getSize() > 10*1024*1024){ //kích thước > 10MB
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("kich thuoc file phai nho hon 10MB");
                }
                String contentFile = file.getContentType();
                if (contentFile == null || !contentFile.startsWith("image/")){
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("tap tin tai len phai la hinh anh");
                }
                String fileName = storeFile(file);
                ImageSanPham imageSanPham = sanPhamService.createImageSanPham(
                    sanPham.getId(),
                        ImageSanPhamDTO.builder()
                                .imageUrl(fileName)
                                .build());
                    imageSanPhams.add(imageSanPham);
            }
            return ResponseEntity.ok().body(imageSanPhams);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("uploads/" + imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notfound.jpeg").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    private String storeFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        //Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
        //Đường dẫn đến thư mục muốn lưu file
        Path uploadDir = Paths.get("uploads");
        //Kiểm tra và tao thư mục nếu nó không tồn tại
        if (!Files.exists(uploadDir)){
            Files.createDirectories(uploadDir);
        }
        //Đường dẫn đến file
        Path destination = Paths.get(uploadDir.toString(), uniqueFileName);
        //Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }
}
