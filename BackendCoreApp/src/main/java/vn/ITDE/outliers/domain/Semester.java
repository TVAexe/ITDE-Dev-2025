package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "semester")
public class Semester {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "semesterId")
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public short getNumber() {
        return number;
    }

    public void setNumber(short number) {
        this.number = number;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
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

    @Column(nullable = false)
    private short number;

    @Column(nullable = false)
    private short year;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    // Getters and setters...
}