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
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> scores;

    // Remove the incorrect relationship with String
    // The semester is already part of the ScoreId

    // Getters and setters...
    
    public ScoreId getId() {
        return id;
    }
    
    public void setId(ScoreId id) {
        this.id = id;
    }
    
    public Student getStudent() {
        return student;
    }
    
    public void setStudent(Student student) {
        this.student = student;
    }
    
    public Map<String, Object> getScores() {
        return scores;
    }
    
    public void setScores(Map<String, Object> scores) {
        this.scores = scores;
    }
    
    // Helper methods to access semester from the id
    public String getSemester() {
        return id != null ? id.getSemester() : null;
    }
}