package vn.ITDE.outliers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.ITDE.outliers.domain.EventDetails;
import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
public interface EventDetailsRepository extends JpaRepository<EventDetails, String> {
    @Query("SELECT new vn.ITDE.outliers.domain.dto.EventDetailsDTO(" +
       "e.id, e.name, e.organizingUnit, e.description, e.startTime, e.endTime, e.location, " +
       "e.participationMethod, e.status, s.id) " +
       "FROM EventDetails e " +
       "JOIN e.semester s " +
       "WHERE e.status = 1")
    List<EventDetailsDTO> findAllEventsByStatus1();


    @Query("SELECT new vn.ITDE.outliers.domain.dto.EventDetailsDTO(" +
           "e.id, e.name, e.organizingUnit, e.description, e.startTime, e.endTime, e.location, " +
           "e.participationMethod, e.status, s.id) " +
           "FROM EventDetails e " +
           "JOIN e.semester s " +
           "WHERE e.endTime > CURRENT_TIMESTAMP")
    List<EventDetailsDTO> findAllOngoingEvents();

    @Query("SELECT new vn.ITDE.outliers.domain.dto.EventDetailsDTO(" +
       "e.id, e.name, e.organizingUnit, e.description, e.startTime, e.endTime, e.location, " +
       "e.participationMethod, e.status, s.id) " +
       "FROM EventDetails e " +
       "JOIN e.semester s " +
       "WHERE e.id = :eventId")
    EventDetailsDTO findEventDetailsById(@Param("eventId") String eventId);
}
