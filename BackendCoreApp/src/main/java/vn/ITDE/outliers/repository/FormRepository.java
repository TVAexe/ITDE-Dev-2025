package vn.ITDE.outliers.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.ITDE.outliers.domain.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, String> {
    @Query("SELECT f FROM Form f " +
           "JOIN f.semester s " +
           "WHERE f.endTime > CURRENT_TIMESTAMP")
    Optional<Form> findFormInPresent();
}
