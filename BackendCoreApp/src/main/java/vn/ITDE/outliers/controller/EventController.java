package vn.ITDE.outliers.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.ITDE.outliers.domain.Event;
import vn.ITDE.outliers.service.EventService;
import vn.ITDE.outliers.domain.EventParticipation;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getEvents(@RequestParam(required = false) String studentId) {
        if (studentId != null) {
            return ResponseEntity.ok(eventService.getRegisteredEvents(studentId));
        }
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerEvent(@RequestBody EventParticipation participation) {
        eventService.registerEvent(participation);
        return ResponseEntity.ok("Event registered successfully");
    }

    @PutMapping("/checkin")
    public ResponseEntity<String> checkinEvent(@RequestBody EventParticipation participation) {
        eventService.checkinEvent(participation);
        return ResponseEntity.ok("Event checked in successfully");
    }

    @GetMapping("/checkincnt")
    public ResponseEntity<Integer> getCheckinCount(
            @RequestParam String studentId,
            @RequestParam String eventId) {
        return ResponseEntity.ok(eventService.getCheckinCount(studentId, eventId));
    }
} 