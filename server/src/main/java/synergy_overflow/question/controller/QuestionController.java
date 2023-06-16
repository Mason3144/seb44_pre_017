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
//      예외처리 테스트용입니다. 실제 로직 작성시 지워주세요
//    @PatchMapping("{question-id}")
//    public ResponseEntity patchQuestion(@RequestBody @Valid QuestionDto.Request request,
//                                        @PathVariable("question-id") @Positive long questionId,
//                                        @RequestParam @Positive int filtered){
//
//        System.out.println(request.getTitle());
//        System.out.println(questionId);
//        System.out.println(filtered);
//
//
//        return null;
//    }
}
