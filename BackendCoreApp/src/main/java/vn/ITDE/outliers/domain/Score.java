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

    // Getters and setters...
}