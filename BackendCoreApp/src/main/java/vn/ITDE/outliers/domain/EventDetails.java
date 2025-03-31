package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "event_details")
public class EventDetails {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "eventId")
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "organizing_unit", nullable = false)
    private String organizingUnit;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = true)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private String location;

    @Column(name = "parti_method", nullable = false)
    private short participationMethod;

    @Column(nullable = false)
    private short status;

    @ManyToOne
    @JoinColumn(name = "semester_id", referencedColumnName = "semesterId", nullable = false)
    private Semester semester;

    // Getters and setters...
}