package vn.ITDE.outliers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.ITDE.outliers.domain.EventDetails;
import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.repository.EventPartiRepository;
import vn.ITDE.outliers.repository.EventDetailsRepository;
import vn.ITDE.outliers.repository.StudentRepository;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventParticipationController {

    @Autowired
    private EventPartiRepository eventPartiRepository;
    @Autowired
    private EventDetailsRepository eventDetailsRepository;
    @Autowired
    private StudentRepository studentRepository;

    // POST: Register for an event
    @PostMapping("/register")
    public ResponseEntity<String> registerEvent(@RequestBody EventParticipationId eventParticipationId) {
        
        
        EventDetails eventDetails = eventDetailsRepository.findById(eventParticipationId.getEventId())
            .orElseThrow(() -> new RuntimeException("Event not found"));

        Student student = studentRepository.findById(eventParticipationId.getStudentId())
        .orElseThrow(() -> new RuntimeException("Student not found"));

        EventParticipation participation = new EventParticipation();
        participation.setId(eventParticipationId);  // Gán EmbeddedId
        participation.setEvent(eventDetails);     // ❗ Bắt buộc khi dùng @MapsId
        participation.setStudent(student);        // ❗ Bắt buộc khi dùng @MapsId
        participation.setCheckin_count((short) 0);
        eventPartiRepository.save(participation);
        return ResponseEntity.ok("Event registered successfully!");
    }

    // GET: Get registered events for a student
    @GetMapping("/registered")
    public ResponseEntity<List<String>> getRegisteredEvents(@RequestParam String studentId) {
        List<String> eventIds = eventPartiRepository.findEventIdsByStudentId(studentId);
        return ResponseEntity.ok(eventIds);
    }

    // PUT: Check-in to an event
    @PutMapping("/checkin")
    public ResponseEntity<String> checkinEvent(@RequestParam String studentId, @RequestParam String eventId, @RequestParam LocalDateTime timestamp) {
        EventParticipation participation = eventPartiRepository.findById(new EventParticipationId(studentId, eventId))
                .orElseThrow(() -> new RuntimeException("Event participation not found"));

        // Check if timestamp is within start_time + 30 minutes
        if (timestamp.isAfter(participation.getEvent().getStartTime().plusMinutes(30))) {
            return ResponseEntity.badRequest().body("Check-in time is outside the allowed window");
        }

        participation.setCheckin_count((short) (participation.getCheckin_count() + 1));
        eventPartiRepository.save(participation);
        return ResponseEntity.ok("Check-in successful!");
    }

    // PUT: Check-out from an event
    @PutMapping("/checkout")
    public ResponseEntity<String> checkoutEvent(@RequestParam String studentId, @RequestParam String eventId, @RequestParam LocalDateTime timestamp) {
        EventParticipation participation = eventPartiRepository.findById(new EventParticipationId(studentId, eventId))
                .orElseThrow(() -> new RuntimeException("Event participation not found"));

        // Check if timestamp is within end_time + 30 minutes
        if (timestamp.isAfter(participation.getEvent().getEndTime().plusMinutes(30))) {
            return ResponseEntity.badRequest().body("Check-out time is outside the allowed window");
        }

        participation.setCheckin_count((short) (participation.getCheckin_count() + 1));
        eventPartiRepository.save(participation);
        return ResponseEntity.ok("Check-out successful!");
    }
}