package vn.ITDE.outliers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
import vn.ITDE.outliers.service.EventDetailsService;

@RestController
@RequestMapping("/eventDetails")
public class EventDetailsController {
    @Autowired
    private EventDetailsService eventDetailsService;

    public EventDetailsController(EventDetailsService eventDetailsService) {
        this.eventDetailsService=eventDetailsService;
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventDetailsDTO> getEventDetailsById(@PathVariable("eventId") String eventId) {
        EventDetailsDTO eventDetails = eventDetailsService.getEventDetailsById(eventId);
        if (eventDetails != null) {
            return ResponseEntity.ok(eventDetails);
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/ongoing")
    public ResponseEntity<List<EventDetailsDTO>> getAllOngoingEvents() {
        List<EventDetailsDTO> events = eventDetailsService.getAllOngoingEvent();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/events-with-status-one")
    public ResponseEntity<List<EventDetailsDTO>> getAllEventsWithStatusOne() {
    List<EventDetailsDTO> events = eventDetailsService.getAllEventByStatus1();
    return ResponseEntity.ok(events);
    }

    
}