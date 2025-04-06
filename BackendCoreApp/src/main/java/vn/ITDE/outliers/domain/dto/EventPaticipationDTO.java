package vn.ITDE.outliers.domain.dto;

import lombok.*;
import jakarta.validation.constraints.NotBlank;
@Getter
@Setter
public class EventPaticipationDTO {
    
    @NotBlank
    private String eventId;

    @NotBlank
    private String studentId;


}
