package vn.ITDE.outliers.service;

import vn.ITDE.outliers.domain.Score;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.repository.ScoreRepository;

public class StudentService {
    private final ScoreRepository studentRepository;
    public StudentService(ScoreRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    
    public Score getStudentScore(String studentId, String semester) {
        return studentRepository.findByIdStudentIdAndIdSemester(studentId, semester)
            .orElseThrow(() -> new RuntimeException("Score not found"));
    }
}
