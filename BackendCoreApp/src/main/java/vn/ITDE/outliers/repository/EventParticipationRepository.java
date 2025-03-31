package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;

public interface EventParticipationRepository extends JpaRepository<EventParticipation, EventParticipationId> {
} 