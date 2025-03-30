package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {
    @Id
    private String username;

    @Column(nullable = false, columnDefinition="TEXT")
    private String password;

    @OneToOne
    @MapsId
    private Student student;

    // Getters and setters...


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Student getStudent() {
        return student;
    }



}