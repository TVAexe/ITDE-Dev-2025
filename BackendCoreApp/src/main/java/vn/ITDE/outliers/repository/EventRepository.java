package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.ITDE.outliers.domain.Event;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {
    @Query("SELECT e FROM Event e JOIN e.eventParticipations ep WHERE ep.student.id = :studentId")
    List<Event> findByStudentId(@Param("studentId") String studentId);
} 