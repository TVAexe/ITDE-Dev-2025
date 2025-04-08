package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;

import java.util.List;

@Repository
public interface EventPartiRepository extends JpaRepository<EventParticipation, EventParticipationId> {

    @Query("SELECT new vn.ITDE.outliers.domain.dto.EventDetailsDTO(" +
       "e.id, e.name, e.organizingUnit, e.description, e.startTime, e.endTime, e.location, " +
       "e.participationMethod, e.status, s.id) " +
       "FROM EventDetails e " +
       "JOIN e.semester s " +
       "JOIN EventParticipation ep ON e.id = ep.event.id " +
       "WHERE ep.student.id = :studentId")
    List<EventDetailsDTO> findEventDetailsByStudentId(@Param("studentId") String studentId);
}