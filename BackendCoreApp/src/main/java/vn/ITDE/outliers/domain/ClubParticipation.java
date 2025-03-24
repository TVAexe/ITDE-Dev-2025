package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "club_parti")
public class ClubParticipation {
    @EmbeddedId
    private ClubParticipationId id;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    @ManyToOne
    @MapsId("clubId")
    private Club club;

    // Getters and setters...
}