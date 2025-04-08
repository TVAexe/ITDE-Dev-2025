package vn.ITDE.outliers.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import vn.ITDE.outliers.service.SemesterService;
import vn.ITDE.outliers.domain.Semester;

@RestController
@RequestMapping("/semester")
public class SemesterController {
    private SemesterService semesterService;
    public SemesterController (SemesterService semesterService) {
        this.semesterService=semesterService;
    }

    @GetMapping("/by-student-id/{studentId}")
    public ResponseEntity<List<Semester>> getSemesterByStudentId(@PathVariable("studentId") String studentId) {
    List<Semester> semesterList = semesterService.getSemestersByStudentId(studentId);
    if (semesterList != null) {
        return ResponseEntity.ok(semesterList);
    }
    return ResponseEntity.notFound().build();
    }

    @GetMapping("/allSemester")
    public ResponseEntity<List<Semester>> getAllSemester() {
        List<Semester> semesterList = semesterService.getAllSemesters();
        if (semesterList != null) {
            return ResponseEntity.ok(semesterList);
        }
        return ResponseEntity.notFound().build();
        }
}
