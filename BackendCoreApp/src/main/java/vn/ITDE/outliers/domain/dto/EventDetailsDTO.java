package vn.ITDE.outliers.domain.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
public class EventDetailsDTO {
    private String name;
    private String organizingUnit;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private short participationMethod;
    private short status;
    private short semesterNumber;
    private short semesterYear;
    private LocalDateTime semesterStartTime;
    private LocalDateTime semesterEndTime;

    public EventDetailsDTO(String name, String organizingUnit, String description, LocalDateTime startTime,
                       LocalDateTime endTime, String location, short participationMethod, short status,
                       short semesterNumber, short semesterYear, LocalDateTime semesterStartTime, LocalDateTime semesterEndTime) {
    this.name = name;
    this.organizingUnit = organizingUnit;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.participationMethod = participationMethod;
    this.status = status;
    this.semesterNumber = semesterNumber;
    this.semesterYear = semesterYear;
    this.semesterStartTime = semesterStartTime;
    this.semesterEndTime = semesterEndTime;
}
}
