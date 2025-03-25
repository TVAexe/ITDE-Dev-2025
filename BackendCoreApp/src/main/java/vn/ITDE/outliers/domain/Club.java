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

    public List<ClubParticipation> getClubParticipations() {
        return clubParticipations;
    }

    public String getId() {
        return id;
    }

    public String getManagingUnit() {
        return managingUnit;
    }

    public String getName() {
        return name;
    }

    public void setClubParticipations(List<ClubParticipation> clubParticipations) {
        this.clubParticipations = clubParticipations;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setManagingUnit(String managingUnit) {
        this.managingUnit = managingUnit;
    }

    public void setName(String name) {
        this.name = name;
    }
}