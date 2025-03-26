package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "event")
public class Event {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "organizing_unit", nullable = false)
    private String organizingUnit;

    private String description;

    @Column(nullable = false)
    private LocalDateTime time;

    @Column(nullable = false)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "parti_method", nullable = false)
    private Method participationMethod;

    @Column(nullable = false)
    private short points;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventParticipation> eventParticipations;

    // Getters and setters...


    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public Method getParticipationMethod() {
        return participationMethod;
    }

    public short getPoints() {
        return points;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }


}