package vn.ITDE.outliers.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EventParticipationId implements Serializable {
    private String studentId;
    private String eventId;

    public EventParticipationId() {}

    public EventParticipationId(String studentId, String eventId) {
        this.studentId = studentId;
        this.eventId = eventId;
    }

    // Getters and setters...

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