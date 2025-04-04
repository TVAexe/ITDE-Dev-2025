package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;

import java.util.List;

@Repository
public interface EventPartiRepository extends JpaRepository<EventParticipation, EventParticipationId> {

    @Query("SELECT ep.id.eventId FROM EventParticipation ep WHERE ep.id.studentId = :studentId")
    List<String> findEventIdsByStudentId(String studentId);
}