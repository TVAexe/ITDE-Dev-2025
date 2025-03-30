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
    private Student student;

    @ManyToOne
    @MapsId("eventId")
    private EventDetails event;

    @Column
    private short position;

    @Column
    private short checkin_count;
    // Getters and setters...
}