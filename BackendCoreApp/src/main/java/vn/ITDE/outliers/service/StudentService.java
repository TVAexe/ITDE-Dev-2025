package vn.ITDE.outliers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.repository.StudentRepository;

import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }
}