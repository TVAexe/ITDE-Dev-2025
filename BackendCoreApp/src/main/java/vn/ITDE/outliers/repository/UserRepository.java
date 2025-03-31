package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.ITDE.outliers.domain.Student;

public interface UserRepository extends JpaRepository<Student, String> {
    Student findByEmail(String email);
}