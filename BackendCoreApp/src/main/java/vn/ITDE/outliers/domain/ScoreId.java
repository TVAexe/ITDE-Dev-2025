package vn.ITDE.outliers.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ScoreId implements Serializable {
    private String studentId;
    private String semester;

    public ScoreId() {}

    public ScoreId(String studentId, String semester) {
        this.studentId = studentId;
        this.semester = semester;
    }

    // Getters and setters...

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScoreId scoreId = (ScoreId) o;
        return Objects.equals(studentId, scoreId.studentId) &&
                Objects.equals(semester, scoreId.semester);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, semester);
    }
}