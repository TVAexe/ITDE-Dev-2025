package vn.ITDE.outliers.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ClubParticipationId implements Serializable {
    private String studentId;
    private String clubId;

    public ClubParticipationId() {}

    public ClubParticipationId(String studentId, String clubId) {
        this.studentId = studentId;
        this.clubId = clubId;
    }

    // Getters and setters...


    public String getClubId() {
        return clubId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setClubId(String clubId) {
        this.clubId = clubId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClubParticipationId that = (ClubParticipationId) o;
        return Objects.equals(studentId, that.studentId) &&
                Objects.equals(clubId, that.clubId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, clubId);
    }
}