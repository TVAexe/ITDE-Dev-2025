package vn.ITDE.outliers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.service.StudentService;
import vn.ITDE.outliers.domain.dto.StudentDTO;

import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable String id) {
        Optional<Student> studentOptional = studentService.getStudentById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            StudentDTO studentDTO = new StudentDTO(student.getId(), student.getName(), student.getBirthDate(),
                    student.getGender(), student.getAddress(), student.getEmail(), student.getPosition(), student.getImage());
            return ResponseEntity.ok(studentDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}