package vn.ITDE.outliers.service;

import org.springframework.stereotype.Service;
import vn.ITDE.outliers.domain.Event;
import vn.ITDE.outliers.domain.EventParticipation;
import vn.ITDE.outliers.domain.EventParticipationId;
import vn.ITDE.outliers.repository.EventRepository;
import vn.ITDE.outliers.repository.EventParticipationRepository;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventParticipationRepository eventParticipationRepository;

    public EventService(EventRepository eventRepository, EventParticipationRepository eventParticipationRepository) {
        this.eventRepository = eventRepository;
        this.eventParticipationRepository = eventParticipationRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public List<Event> getRegisteredEvents(String studentId) {
        return eventRepository.findByStudentId(studentId);
    }

    public void registerEvent(EventParticipation participation) {
        eventParticipationRepository.save(participation);
    }

    public void checkinEvent(EventParticipation participation) {
        EventParticipation existingParticipation = eventParticipationRepository
                .findById(participation.getId())
                .orElseThrow(() -> new RuntimeException("Event participation not found"));
        
        existingParticipation.setCheckinCount((short) (existingParticipation.getCheckinCount() + 1));
        eventParticipationRepository.save(existingParticipation);
    }

    public int getCheckinCount(String studentId, String eventId) {
        return eventParticipationRepository
                .findById(new EventParticipationId(studentId, eventId))
                .map(EventParticipation::getCheckinCount)
                .orElse((short) 0);
    }
} 