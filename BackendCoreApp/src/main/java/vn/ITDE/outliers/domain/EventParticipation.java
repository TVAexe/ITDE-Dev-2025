package vn.ITDE.outliers.domain;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "event_parti")
public class EventParticipation {
    @EmbeddedId
    private EventParticipationId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id") // Chỉ định tên cột rõ ràng
    private Student student;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id") // Chỉ định tên cột rõ ràng
    private EventDetails event;

    @Column
    private short position;

    @Column
    private short checkin_count;
    // Getters and setters...
    
}