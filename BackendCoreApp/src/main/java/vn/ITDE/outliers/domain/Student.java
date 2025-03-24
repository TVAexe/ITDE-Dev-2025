package vn.ITDE.outliers.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "student")
public class Student {
    @Id
    private String id;

    private String name;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    private String address;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "class_id", nullable = false)
    private String classId;

    @Column(name = "department_id", nullable = false)
    private String departmentId;

    private String position;

    @Lob
    private byte[] image;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Account account;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClubParticipation> clubParticipations;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventParticipation> eventParticipations;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Score> scores;

    // Getters and setters...
}