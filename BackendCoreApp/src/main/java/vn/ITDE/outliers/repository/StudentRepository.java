package vn.ITDE.outliers.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.ITDE.outliers.domain.Student;
public interface StudentRepository extends JpaRepository<Student, String> {

}
