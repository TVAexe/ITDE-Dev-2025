package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "department")
public class Department {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "departmentId")
    private String id; // Khóa chính với độ dài cố định là 32 ký tự


    @Column(nullable = false)
    private String name;

    // Getters and setters...
}