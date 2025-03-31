package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "club")
public class Club {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "clubId")
    private String id; // Khóa chính với độ dài cố định là 32 ký tự


    @Column(nullable = false)
    private String name;

    @Column(name = "managing_unit")
    private short managingUnit;

    // Getters and setters...
}