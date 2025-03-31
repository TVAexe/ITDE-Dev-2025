package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "department")
public class Department {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    // Getters and setters...
}