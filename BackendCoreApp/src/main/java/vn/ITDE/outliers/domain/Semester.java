package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "semester")
public class Semester {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "semesterId")
    private String id;

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