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

    @Column
    private short position;
    // Getters and setters...


    public Student getStudent() {
        return student;
    }

    public ClubParticipationId getId() {
        return id;
    }

    public Club getClub() {
        return club;
    }

    public void setId(ClubParticipationId id) {
        this.id = id;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setClub(Club club) {
        this.club = club;
    }
}