package vn.ITDE.outliers.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.ITDE.outliers.domain.Score;
import vn.ITDE.outliers.domain.ScoreId;

public interface ScoreRepository extends JpaRepository<Score, ScoreId> {
    Optional<Score> findByIdStudentIdAndIdSemester(String studentId, String semester);
}
