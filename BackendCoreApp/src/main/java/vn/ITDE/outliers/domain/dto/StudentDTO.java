package vn.ITDE.outliers.domain.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class StudentDTO {
    private String id;
    private String name;
    private LocalDate birthDate;
    private short gender;
    private String address;
    private String email;
    private short position;
    private String image;

    public String getStudentId() {
        return id;
    }

    public void setStudentId(String id) {
        this.id = id;
    }
}
