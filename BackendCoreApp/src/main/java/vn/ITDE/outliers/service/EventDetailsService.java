package vn.ITDE.outliers.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;

import vn.ITDE.outliers.domain.EventDetails;
import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
import vn.ITDE.outliers.repository.EventDetailsRepository;


@Service
public class EventDetailsService {
    @Autowired
    private EventDetailsRepository eventDetailsRepository;

    public EventDetailsService(EventDetailsRepository eventDetailsRepository) {
        this.eventDetailsRepository=eventDetailsRepository;
    }

    public List<EventDetailsDTO> getAllEventByStatus1() {
        return eventDetailsRepository.findAllEventsByStatus1();
    }

    public List<EventDetailsDTO> getAllOngoingEvent() {
        return eventDetailsRepository.findAllOngoingEvents();
    }

    public EventDetailsDTO getEventDetailsById(String eventId) {
        return eventDetailsRepository.findEventDetailsById(eventId);
    }
}
