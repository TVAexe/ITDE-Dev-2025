package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "club")
public class Club {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "managing_unit", nullable = false)
    private String managingUnit;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClubParticipation> clubParticipations;

    // Getters and setters...
}