package vn.ITDE.outliers.domain.dto;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
public class SemesterDTO {
    private String semesterId;
    private short number;
    private short year;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public SemesterDTO(String semesterId, short number,short year, LocalDateTime startTime, LocalDateTime endTime) {
        this.semesterId=semesterId;
        this.number=number;
        this.year=year;
        this.startTime=startTime;
        this.endTime=endTime;
    }


}
