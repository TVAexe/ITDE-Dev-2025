package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.*;
import vn.ITDE.outliers.domain.Semester;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, String>{
    @Query("SELECT DISTINCT s.semester FROM Score s WHERE s.student.id = :studentId")
    List<Semester> findSemestersByStudentId(@Param("studentId") String studentId);
}
