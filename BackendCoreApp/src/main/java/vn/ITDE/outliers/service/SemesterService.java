package vn.ITDE.outliers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;


import vn.ITDE.outliers.domain.Semester;
import vn.ITDE.outliers.repository.SemesterRepository;

import java.util.List;

@Service
public class SemesterService {
    @Autowired
    private SemesterRepository semesterRepository;

    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository=semesterRepository;
    }
    public List<Semester> getSemestersByStudentId(String studentId) {
        return semesterRepository.findSemestersByStudentId(studentId);
    }

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }
}
