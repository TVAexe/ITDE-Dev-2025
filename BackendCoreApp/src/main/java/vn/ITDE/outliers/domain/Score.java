package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "score")
public class Score {
    @EmbeddedId
    private ScoreId id;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb") 
    private Map<String, Object> scores;

    // Getters and setters...


    public Student getStudent() {
        return student;
    }

    public Map<String, Object> getScores() {
        return scores;
    }

    public ScoreId getId() {
        return id;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setId(ScoreId id) {
        this.id = id;
    }

    public void setScores(Map<String, Object> scores) {
        this.scores = scores;
    }
}