package vn.ITDE.outliers.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class StudentSemesterId implements Serializable {
    private String studentId;
    private String semesterId;

    public StudentSemesterId() {}

    public StudentSemesterId(String studentId, String semesterId) {
        this.studentId = studentId;
        this.semesterId = semesterId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(String semesterId) {
        this.semesterId = semesterId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudentSemesterId that = (StudentSemesterId) o;
        return Objects.equals(studentId, that.studentId) &&
                Objects.equals(semesterId, that.semesterId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, semesterId);
    }
}