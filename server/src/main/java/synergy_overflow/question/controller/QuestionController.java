package synergy_overflow.question.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.mapper.QuestionMapper;
import synergy_overflow.question.sevice.QuestionService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
public class QuestionController {
    private final QuestionService service;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService service, QuestionMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionDto.Post requestBody){
        Question createdQuestion = service.createQuestion(mapper.questionDtoPostToQuestion(requestBody));

        return new ResponseEntity<>(mapper.questionToQuestionDtoResponse(createdQuestion), HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){
        Question foundQuestion = service.getQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToQuestionDtoResponse(foundQuestion), HttpStatus.OK);
    }

    @GetMapping("/board")
    public ResponseEntity getQuestions(@RequestParam @Positive int page,
                                       @RequestParam @Positive int size,
                                       @RequestParam String sort){
        Page<Question> pageQuestions = service.getQuestions(page-1, size, sort);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto(mapper.questionsToMultiResponseDtos(questions),pageQuestions),
                                    HttpStatus.OK);
    }
    @GetMapping("/home")
    public ResponseEntity getQuestionsHome(){
        Page<Question> pageQuestions = service.getQuestions(0,30,"new");

        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto(mapper.questionsToMultiResponseDtos(questions)),
                HttpStatus.OK);
    }

    @PatchMapping("/{questions-id}/edit")
    public ResponseEntity patchQuestion(@RequestBody @Valid QuestionDto.Patch requestBody,
                                        @PathVariable("questions-id") @Positive long questionId){
        requestBody.setQuestionId(questionId);
        Question editQuestion = service.editQuestion(mapper.questionDtoPatchToQuestion(requestBody));

        return new ResponseEntity<>(mapper.questionToQuestionDtoResponse(editQuestion), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){
        service.removeQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
