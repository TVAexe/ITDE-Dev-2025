package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "score")
public class Score {
    @EmbeddedId
    private ScoreId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> scores;

    @ManyToOne
    @MapsId("semester") // Tên trường trong ScoreId
    @JoinColumn(name = "semester_id", referencedColumnName = "semesterId", nullable = false) // Sửa name thành "semester_id"
    private Semester semester;
    
    public String getSemester() {
        return id != null ? id.getSemester() : null;
    }
}