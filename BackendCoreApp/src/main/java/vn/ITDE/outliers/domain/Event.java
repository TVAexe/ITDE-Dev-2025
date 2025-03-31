package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "event_details")
public class Event {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name = "organizing_unit", nullable = false)
    private String organizingUnit;

    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventParticipation> eventParticipations;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrganizingUnit() {
        return organizingUnit;
    }

    public void setOrganizingUnit(String organizingUnit) {
        this.organizingUnit = organizingUnit;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<EventParticipation> getEventParticipations() {
        return eventParticipations;
    }

    public void setEventParticipations(List<EventParticipation> eventParticipations) {
        this.eventParticipations = eventParticipations;
    }
} 