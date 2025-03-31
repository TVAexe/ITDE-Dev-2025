package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "club")
public class Club {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "managing_unit")
    private short managingUnit;

    // Getters and setters...
}