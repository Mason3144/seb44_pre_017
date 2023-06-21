package synergy_overflow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.mapper.AnswerMapper;
import synergy_overflow.answer.service.AnswerService;
import synergy_overflow.member.repository.MemberRepository;

@RestController
@RequestMapping(value = "/questions/{question-id}/answers")
public class AnswerController {
    private final AnswerService answerService;

    private MemberRepository memberRepository;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper ) {
        this.answerService = answerService;
        this.mapper = mapper;

    }

    //답변 등록
    @PostMapping
    public ResponseEntity postAnswer (@RequestBody AnswerDto.postDto requestBody){
//        Member member = memberRepository.f
        Answer answer = mapper.AnswerPostToAnswer(requestBody);
        answerService.createAnswer(answer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 채택 post
    @PostMapping("/{answer-id}/adopt")
    public ResponseEntity adopted(@PathVariable ("answer-id") Long answerId){

        Answer adoptedAnswer = answerService.adotp(answerId);
        AnswerDto.responseDto response = mapper.AnswerToResponse(adoptedAnswer);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채택 delete
    @DeleteMapping("/{answer-id}/adopt")
    public ResponseEntity unAdopted(@PathVariable ("answer-id") Long answerId){
        Answer unAdoptedAnswer = answerService.unAdotp(answerId);
        AnswerDto.responseDto response = mapper.AnswerToResponse(unAdoptedAnswer);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}/edit")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") Long answerId,
                                      @RequestBody AnswerDto.patchDto requestBody){
        requestBody.setAnswerId(answerId);

        Answer answer = mapper.AnswerPatchToAnswer(requestBody);
        Answer updatedAnswer =answerService.updateAnswer(answer);
        AnswerDto.responseDto response = mapper.AnswerToResponse(updatedAnswer);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable ("answer-id") Long answerId){
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
