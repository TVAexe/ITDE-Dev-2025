package vn.ITDE.outliers.domain;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;

@Entity
@Table(name = "event_parti")
public class EventParticipation {
    @EmbeddedId
    private EventParticipationId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "checkin_count")
    private short checkinCount;

    // Getters and setters
    public EventParticipationId getId() {
        return id;
    }

    public void setId(EventParticipationId id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public short getCheckinCount() {
        return checkinCount;
    }

    public void setCheckinCount(short checkinCount) {
        this.checkinCount = checkinCount;
    }
}