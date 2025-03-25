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


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public void setClubParticipations(List<ClubParticipation> clubParticipations) {
        this.clubParticipations = clubParticipations;
    }

    public void setEventParticipations(List<EventParticipation> eventParticipations) {
        this.eventParticipations = eventParticipations;
    }

    public String getName() {
        return name;
    }

    public Account getAccount() {
        return account;
    }

    public byte[] getImage() {
        return image;
    }

    public Gender getGender() {
        return gender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public String getClassId() {
        return classId;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public List<ClubParticipation> getClubParticipations() {
        return clubParticipations;
    }

    public String getEmail() {
        return email;
    }

    public String getPosition() {
        return position;
    }

    public List<EventParticipation> getEventParticipations() {
        return eventParticipations;
    }

    public List<Score> getScores() {
        return scores;
    }
}