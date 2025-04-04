package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;

import java.util.List;

@Repository
public interface EventPartiRepository extends JpaRepository<EventParticipation, EventParticipationId> {

    @Query(value = "SELECT event_id FROM event_parti WHERE student_id = :studentId", nativeQuery = true)
    List<String> findEventIdsByStudentId(@Param("studentId") String studentId);
}