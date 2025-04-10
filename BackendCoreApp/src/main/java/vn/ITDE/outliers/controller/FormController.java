package vn.ITDE.outliers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.ITDE.outliers.service.FormService;
import vn.ITDE.outliers.domain.Form;
import vn.ITDE.outliers.domain.dto.FormDTO;

import java.util.Optional;

@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    private FormService formService;

    @GetMapping("/current")
    public ResponseEntity<Form> getFormInPresent() {
        Optional<Form> form = formService.getFormInPresent();
        return form.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<Form> createForm(@RequestBody FormDTO formDTO) {
        Form createdForm = formService.createForm(formDTO);
        return ResponseEntity.ok(createdForm);
    }
}