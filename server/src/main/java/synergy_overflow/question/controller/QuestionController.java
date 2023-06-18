package synergy_overflow.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.question.dto.QuestionDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
@Validated
public class QuestionController {
    @PostMapping("/ask")
    public ResponseEntity postQuestion(){
        return null;
    }
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(){
        return null;
    }

    @GetMapping
    public ResponseEntity getQuestions(){
        return null;
    }

    @PatchMapping("/{questions-id}/edit")
    public ResponseEntity patchQuestion(){
        return null;
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(){
        return null;
    }

}
