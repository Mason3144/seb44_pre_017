package synergy_overflow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.adaption.service.AdoptionService;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.mapper.AnswerMapper;
import synergy_overflow.answer.service.AnswerService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping(value = "/questions/{question-id}/answers")
public class AnswerController {
    private final AnswerService answerService;
    private final AdoptionService adoptionService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AdoptionService adoptionService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.adoptionService = adoptionService;
        this.mapper = mapper;
    }

    //답변 등록
    @PostMapping
    public ResponseEntity postAnswer(@RequestBody AnswerDto.postDto requestBody,
                                     @Positive @PathVariable("question-id") long questionId) {
        Answer postAnswer = mapper.AnswerDtoPostToAnswer(requestBody);
        answerService.createAnswer(postAnswer, questionId);
        AnswerDto.Response response = mapper.AnswerToResponse(postAnswer);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 채택 post
    @PostMapping("/{answer-id}/adopt")
    public ResponseEntity adopted(@Positive @PathVariable("answer-id") long answerId,
                                  @Positive @PathVariable("question-id") long questionId) {

        Answer adoptedAnswer = adoptionService.createAdoption(answerId, questionId);

        AnswerDto.Response response = mapper.AnswerToResponse(adoptedAnswer);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 채택 delete
    @DeleteMapping("/{answer-id}/adopt")
    public ResponseEntity unAdopted(@PathVariable("answer-id") Long answerId,
                                    @Positive @PathVariable("question-id") Long questionId) {
        Answer unAdoptedAnswer = adoptionService.deleteAdaption(answerId, questionId);

        AnswerDto.Response response = mapper.AnswerToResponse(unAdoptedAnswer);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}/edit")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerDto.patchDto requestBody) {
        requestBody.setAnswerId(answerId);

        Answer answer = mapper.AnswerDtoPatchToAnswer(requestBody);
        Answer updatedAnswer = answerService.updateAnswer(answer);
        AnswerDto.Response response = mapper.AnswerToResponse(updatedAnswer);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 답변 삭제
    // 답변 삭제시 질문 apdation 같이 삭제 ??
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
