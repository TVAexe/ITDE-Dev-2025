package vn.ITDE.outliers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import vn.ITDE.outliers.domain.EventParticipationId;
import vn.ITDE.outliers.service.EventPartiService;
import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventParticipationController {

    @Autowired
    private EventPartiService eventPartiService;

    public EventParticipationController(EventPartiService eventPartiService) {
        this.eventPartiService=eventPartiService;
    }

    // POST: Register for an event
    @PostMapping("/register")
    public ResponseEntity<String> registerEvent(@RequestBody EventParticipationId eventParticipationId) {
        String result = eventPartiService.registerEvent(eventParticipationId);
        return ResponseEntity.ok(result);
    }

    // GET: Get registered events for a student
    @GetMapping("/registered")
    public ResponseEntity<List<EventDetailsDTO>> getRegisteredEvents(@RequestParam(name = "studentId") String studentId) {
        List<EventDetailsDTO> eventDetailsList = eventPartiService.getRegisteredEvents(studentId);
        return ResponseEntity.ok(eventDetailsList);
    }

    
    

    
}