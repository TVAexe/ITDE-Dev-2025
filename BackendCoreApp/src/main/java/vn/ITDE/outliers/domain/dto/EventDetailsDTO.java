package vn.ITDE.outliers.domain.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
public class EventDetailsDTO {
    private String eventId;
    private String name;
    private String organizingUnit;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private short participationMethod;
    private short status;
    private String semesterId;
    

    public EventDetailsDTO(String eventId,String name, String organizingUnit, String description, LocalDateTime startTime,
                       LocalDateTime endTime, String location, short participationMethod, short status,
                       String semesterId) {
    this.name = name;
    this.eventId = eventId;
    this.organizingUnit = organizingUnit;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.participationMethod = participationMethod;
    this.status = status;
    this.semesterId=semesterId;
}
}
