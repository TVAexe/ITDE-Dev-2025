package vn.ITDE.outliers.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "student_semester")
public class StudentSemester {
    @EmbeddedId
    private StudentSemesterId id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @MapsId("semesterId")
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    // Getters and setters...

    public StudentSemesterId getId() {
        return id;
    }

    public void setId(StudentSemesterId id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
}