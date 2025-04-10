package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "form")
public class Form {

    @Id
    @Column(name = "semester_id", length = 32, nullable = false)
    private String semesterId; // Primary key, liên kết với bảng semester

    @Column(name = "title", nullable = false, length = 255)
    private String title; // Tiêu đề của form, không được null

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime; // Thời gian kết thúc của form, không được null

    @ManyToOne
    @JoinColumn(name = "semester_id", referencedColumnName = "semesterId", insertable = false, updatable = false)
    private Semester semester; // Liên kết với bảng semester

    
}