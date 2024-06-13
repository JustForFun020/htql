package com.example.bookstoreserver.repository;

import com.example.bookstoreserver.entity.KhoHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KhoHangRepository extends JpaRepository<KhoHang, Long> {
}
