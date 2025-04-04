package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)")
    private String id; // Khóa chính với độ dài cố định là 32 ký tự

    

    private String name;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private short gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(unique = true, nullable = false)
    private String email;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassInfo classInfo;

    @Column
    private short position;

    @Column(columnDefinition = "TEXT")
    private String image;

    // Getters and setters...
}