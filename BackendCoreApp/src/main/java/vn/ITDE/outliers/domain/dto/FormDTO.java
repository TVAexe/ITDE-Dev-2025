package vn.ITDE.outliers.domain.dto;

import lombok.*;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FormDTO {
    private String semesterId;
    private String title;
    private LocalDateTime endTime;

}
