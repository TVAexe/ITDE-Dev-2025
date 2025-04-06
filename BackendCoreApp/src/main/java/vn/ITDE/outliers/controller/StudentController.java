package vn.ITDE.outliers.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import vn.ITDE.outliers.domain.Score;
import vn.ITDE.outliers.service.StudentService;

public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    @GetMapping("/students/{studentId}/{semesterId}")
    public ResponseEntity<?> getScoreStudentById(
            @PathVariable String studentId,
            @PathVariable String semesterId) {
        try {
            Score score = studentService.getStudentScore(studentId, semesterId);
            return ResponseEntity.ok(score);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Score not found for studentId: " 
                + studentId + " and semesterId: " + semesterId);
        }
    }
}
