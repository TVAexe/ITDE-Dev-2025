package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "class_info")
public class ClassInfo {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name= "classId")
    private String id; 


    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    // Getters and setters...
}