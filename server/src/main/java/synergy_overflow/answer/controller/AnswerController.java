package synergy_overflow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.mapper.AnswerMapper;
import synergy_overflow.answer.service.AnswerService;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.sevice.QuestionService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping(value = "/questions/{question-id}/answers")
public class AnswerController {
    private final AnswerService answerService;
    private final QuestionService questionService;


    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper,QuestionService questionService ) {
        this.answerService = answerService;
        this.mapper = mapper;
        this.questionService=questionService;
    }

    //답변 등록
    @PostMapping
    public ResponseEntity postAnswer (@RequestBody AnswerDto.postDto requestBody,
                                      @Positive @PathVariable("question-id") long questionId){
        Answer postAnswer = mapper.AnswerDtoPostToAnswer(requestBody);
        answerService.createAnswer(postAnswer,questionId);
        AnswerDto.responseDto response =mapper.AnswerToResponse(postAnswer);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    // 채택 post
    @PostMapping("/{answer-id}/adopt")
    public ResponseEntity adopted(@Positive @PathVariable ("answer-id") Long answerId,
                                  @Positive @PathVariable ("question-id") Long questionId){


        Answer adoptedAnswer = answerService.adopt(answerId,questionId);
        AnswerDto.responseDto response = mapper.AnswerToResponse(adoptedAnswer);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채택 delete
    @DeleteMapping("/{answer-id}/adopt")
    public ResponseEntity unAdopted(@PathVariable ("answer-id") Long answerId,
                                    @Positive @PathVariable ("question-id") Long questionId){
        Answer unAdoptedAnswer = answerService.unAdopt(answerId,questionId);
        AnswerDto.responseDto response = mapper.AnswerToResponse(unAdoptedAnswer);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}/edit")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerDto.patchDto requestBody){
        requestBody.setAnswerId(answerId);

        Answer answer = mapper.AnswerDtoPatchToAnswer(requestBody);
        Answer updatedAnswer =answerService.updateAnswer(answer);
        AnswerDto.responseDto response = mapper.AnswerToResponse(updatedAnswer);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 답변 삭제
    // 답변 삭제시 질문 apdation 같이 삭제 ??
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@Positive @PathVariable ("answer-id") Long answerId){
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
