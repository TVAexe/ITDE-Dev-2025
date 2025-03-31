package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(length = 32, nullable = false, columnDefinition = "VARCHAR(32)", name = "username")
    private String username; // Khóa chính

    @Column(nullable = false, columnDefinition = "TEXT")
    private String password; // Mật khẩu, không được để trống

    @Column(nullable = false, name = "role")
    private short role; // Vai trò, không được để trống


    @OneToOne(optional=true)
    @JoinColumn(name = "student_id", referencedColumnName = "id") // Tham chiếu đến cột id trong bảng student
    private Student student;


    // Getters và Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public short getRole() {
        return role;
    }

    public void setRole(short role) {
        this.role = role;
    }
}