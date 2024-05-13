package com.example.bookstoreserver.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "email")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Email extends BaseEntity{
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "end_time")
    private LocalDateTime endTime;
    private String code;
    @Column(name = "iscomfirm")
    private boolean isComfirm;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoidung_id", foreignKey = @ForeignKey(name = "fk_Email_NguoiDung"))
    @JsonManagedReference
    private NguoiDung nguoiDung;
}
