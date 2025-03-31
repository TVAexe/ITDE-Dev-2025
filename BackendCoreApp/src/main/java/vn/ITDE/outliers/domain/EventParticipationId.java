package vn.ITDE.outliers.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EventParticipationId implements Serializable {
    
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)")
    private String studentId;

    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)")
    private String eventId;

    public EventParticipationId() {}

    public EventParticipationId(String studentId, String eventId) {
        this.studentId = studentId;
        this.eventId = eventId;
    }

    // Getters and setters...


    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventParticipationId that = (EventParticipationId) o;
        return Objects.equals(studentId, that.studentId) &&
                Objects.equals(eventId, that.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, eventId);
    }
}