package synergy_overflow.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.question.dto.QuestionDto;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
@Validated
public class QuestionController {
    @PatchMapping("{question-id}")
    public ResponseEntity patchQuestion(@RequestBody QuestionDto.Request request,
                                        @PathVariable("question-id") @Positive long questionId,
                                        @RequestParam @Positive int filtered){

        System.out.println(request.getTitle());
        System.out.println(questionId);
        System.out.println(filtered);


        return null;
    }
}
