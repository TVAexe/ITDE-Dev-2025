package vn.ITDE.outliers.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;

import vn.ITDE.outliers.domain.EventDetails;
import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.domain.dto.EventDetailsDTO;
import vn.ITDE.outliers.repository.EventDetailsRepository;
import vn.ITDE.outliers.repository.EventPartiRepository;
import vn.ITDE.outliers.repository.StudentRepository;

@Service
public class EventPartiService {
    @Autowired
    private EventPartiRepository eventPartiRepository;
    @Autowired
    private EventDetailsRepository eventDetailsRepository;
    @Autowired
    private StudentRepository studentRepository;

    public EventPartiService(EventPartiRepository eventPartiRepository, EventDetailsRepository eventDetailsRepository, StudentRepository studentRepository) {
        this.eventPartiRepository = eventPartiRepository;
        this.eventDetailsRepository = eventDetailsRepository;
        this.studentRepository = studentRepository;
    }

    public String registerEvent(EventParticipationId eventParticipationId) {
        // Tìm kiếm thông tin sự kiện
        EventDetails eventDetails = eventDetailsRepository.findById(eventParticipationId.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Tìm kiếm thông tin sinh viên
        Student student = studentRepository.findById(eventParticipationId.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Tạo đối tượng EventParticipation
        EventParticipation participation = new EventParticipation();
        participation.setId(eventParticipationId);  // Gán EmbeddedId
        participation.setEvent(eventDetails);       // ❗ Bắt buộc khi dùng @MapsId
        participation.setStudent(student);          // ❗ Bắt buộc khi dùng @MapsId
        participation.setCheckin_count((short) 0);

        // Lưu vào cơ sở dữ liệu
        eventPartiRepository.save(participation);

        return "Event registered successfully!";
    }

    public List<EventDetailsDTO> getRegisteredEvents(String studentId) {
        return eventPartiRepository.findEventDetailsByStudentId(studentId);
    }

    public List<EventDetailsDTO> getAllEventByStatus1() {
        return eventDetailsRepository.findAllEventsByStatus1();
    }

}
