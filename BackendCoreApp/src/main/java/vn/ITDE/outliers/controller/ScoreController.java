package vn.ITDE.outliers.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import vn.ITDE.outliers.domain.Score;
import vn.ITDE.outliers.service.ScoreService;

@RestController
public class ScoreController {
    private final ScoreService scoreService;
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }
    @GetMapping("/score")
    public ResponseEntity<Map<String, Object>> getScores(
            @RequestParam("studentId") String studentId,
            @RequestParam("semester") String semester) { // Sửa "semesterId" thành "semester"
        Map<String, Object> scores = scoreService.getScores(studentId, semester);
        if (scores != null) {
            return ResponseEntity.ok(scores);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/score")
    public ResponseEntity<Score> appendSelfScore(
            @RequestParam("studentId") String studentId,
            @RequestParam("semester") String semester,
            @RequestBody Map<String, Float> requestBody) {
        Float selfScore = requestBody.get("self_score");
        Score updatedScore = scoreService.appendSelfScoreAndReturn(studentId, semester, selfScore);
        if (updatedScore != null) {
            return ResponseEntity.ok(updatedScore);
        }
        return ResponseEntity.notFound().build();
    }
    // @GetMapping("/total_scores")
    // public ResponseEntity<Map<String, Object>> getTotalScores(
    //         @RequestParam("studentId") String studentId,
    //         @RequestParam("semester") String semester) { // Sửa "semesterId" thành "semester"
    //     Map<String, Object> scores = scoreService.getTotalScores(studentId, semester);
    //     if (scores != null) {
    //         return ResponseEntity.ok(scores);
    //     }
    //     return ResponseEntity.notFound().build();
    // }
}
