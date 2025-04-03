package vn.ITDE.outliers.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ScoreId implements Serializable {
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "studentId")
    private String studentId;

    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "semester_id") // Sửa từ "semester" thành "semester_id"
    private String semester;

    public ScoreId() {}

    public ScoreId(String studentId, String semester) {
        this.studentId = studentId;
        this.semester = semester;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

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