package vn.ITDE.outliers.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.ITDE.outliers.repository.FormRepository;
import vn.ITDE.outliers.domain.Form;
import vn.ITDE.outliers.domain.dto.FormDTO;

@Service
public class FormService {
    @Autowired
    private FormRepository formRepository;

    public FormService(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    public Optional<Form> getFormInPresent() {
        return formRepository.findFormInPresent();
    }

    public Form createForm(FormDTO formDTO) {
        Form form = new Form();
        form.setSemesterId(formDTO.getSemesterId());
        form.setTitle(formDTO.getTitle());
        form.setEndTime(formDTO.getEndTime());
        return formRepository.save(form);
    }

    
    
}
