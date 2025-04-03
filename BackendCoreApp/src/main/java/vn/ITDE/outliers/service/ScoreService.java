package vn.ITDE.outliers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;

import vn.ITDE.outliers.domain.Score;
import vn.ITDE.outliers.repository.ScoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ScoreService {
    
    @Autowired
    private ScoreRepository scoreRepository;

    public Map<String, Object> getScores(String studentId, String semester) {
        return scoreRepository.findByIdStudentIdAndIdSemester(studentId, semester)
            .map(score -> {
                Map<String, Object> scores = score.getScores();
                double total = scores.values().stream()
                    .filter(value -> value instanceof Number)
                    .mapToDouble(value -> ((Number) value).doubleValue())
                    .sum();
                scores.put("totalScore", total);
                return scores;
            })
            .orElse(null);
    }
}