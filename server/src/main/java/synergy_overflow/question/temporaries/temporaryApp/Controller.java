package synergy_overflow.question.temporaries.temporaryApp;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.mapper.QuestionMapper;
import synergy_overflow.question.temporaries.temporaryDtos.AnswerDto;
import synergy_overflow.question.temporaries.temporaryEntities.AnswerEntity;

import javax.transaction.Transactional;

@Transactional
@RestController
public class Controller {
    private final MemberRepository memberRepository;
    private final QuestionMapper mapper;
    private final AnswerRepository answerRepository;

    public Controller(MemberRepository memberRepository, QuestionMapper mapper, AnswerRepository answerRepository) {
        this.memberRepository = memberRepository;
        this.mapper = mapper;
        this.answerRepository = answerRepository;
    }

    @PostMapping("/member")
    public ResponseEntity postMember(@RequestBody MemberDto.Post requestBody){
        Member member = new Member();
        member.setEmail(requestBody.getEmail());
        member.setPassword(requestBody.getPassword());
        member.setNickname(requestBody.getNickname());

        Member newMember = memberRepository.save(member);

        return new ResponseEntity<>(mapper.memberToWriterDtoResponse(newMember),HttpStatus.CREATED);
    }
    @PostMapping("/questions/{question-id}/answer")
    public ResponseEntity postAnswer(@RequestBody AnswerDto.Post requestBody,
                                     @PathVariable("question-id") long questionId){



        AnswerEntity answer = new AnswerEntity();
//        answer.setWriter(new Member(1L));
        answer.setAnswerBody(requestBody.getBody());

        Question question = new Question();
        question.setQuestionId(questionId);

        question.setAnswers(answer);

        AnswerEntity newAnswer = answerRepository.save(answer);

        return new ResponseEntity<>(mapper.answerToAnswerDtoResponse(newAnswer),HttpStatus.CREATED);
    }
}
