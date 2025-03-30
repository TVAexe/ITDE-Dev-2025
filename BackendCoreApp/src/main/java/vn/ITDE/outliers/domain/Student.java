package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {
    @Id
    private String id;

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