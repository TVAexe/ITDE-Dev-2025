package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "class_info")
public class ClassInfo {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Getters and setters...
}