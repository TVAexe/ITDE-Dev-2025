package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "event_parti")
public class EventParticipation {
    @EmbeddedId
    private EventParticipationId id;

    @ManyToOne
    @MapsId("studentId")
    private Student student;

    @ManyToOne
    @MapsId("eventId")
    private Event event;

    // Getters and setters...


    public Student getStudent() {
        return student;
    }

    public EventParticipationId getId() {
        return id;
    }

    public Event getEvent() {
        return event;
    }
}