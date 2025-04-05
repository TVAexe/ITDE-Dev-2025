package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.ITDE.outliers.domain.EventDetails;
public interface EventDetailsRepository extends JpaRepository<EventDetails, String> {


}
