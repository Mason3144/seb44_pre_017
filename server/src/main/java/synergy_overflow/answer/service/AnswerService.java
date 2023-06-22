package synergy_overflow.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.adaption.entity.Adaption;
import synergy_overflow.adaption.repository.AdaptionRepository;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.repository.AnswerRepository;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.repository.QuestionRepository;
import synergy_overflow.question.sevice.QuestionService;

import javax.validation.constraints.Positive;
import java.util.Optional;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final MemberRepository memberRepository;

    private final QuestionRepository questionRepository;

    private final QuestionService questionService;

    private final AdaptionRepository adaptionRepository;

    public AnswerService(AnswerRepository answerRepository, MemberRepository memberRepository, QuestionRepository questionRepository, QuestionService questionService, AdaptionRepository adaptionRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.questionService = questionService;
        this.adaptionRepository = adaptionRepository;
    }

    @Transactional
    public Answer createAnswer(Answer answer, @Positive long questionId){
        Member member = memberRepository.findByEmail(LoggedInMemberUtils.findLoggedInMember()).get();
        member.setMyAnswers(answer);
        Question question = questionRepository.getReferenceById(questionId);
        question.setAnswers(answer);
        return answerRepository.save(answer);

    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer adopt(long answerId,  Long questionId){
        Question existQuestion = questionService.findExistsQuestion(questionId);
        LoggedInMemberUtils.verifyMine(existQuestion.getWriter().getEmail());

        Adaption adaption =new Adaption();
        adaption.setQuestion(existQuestion);
        existQuestion.setAdaption(adaption);

        existQuestion.setAdopted(true);
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAdopted(true);
        adaption.setAnswer(findAnswer);
        findAnswer.setAdaption(adaption);

        adaptionRepository.save(adaption);

        questionRepository.save(existQuestion);

        return answerRepository.save(findAnswer);
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer unAdopt(long answerId,  Long questionId){
        Question existQuestion = questionService.findExistsQuestion(questionId);
        LoggedInMemberUtils.verifyMine(existQuestion.getWriter().getEmail());



        existQuestion.setAdopted(false);



        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAdopted(false);
        questionRepository.save(existQuestion);

        return answerRepository.save(findAnswer);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer updateAnswer(Answer answer){
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        LoggedInMemberUtils.verifyMine(findAnswer.getWriter().getEmail());
        findAnswer.setAnswerBody(answer.getAnswerBody());

        return answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
        LoggedInMemberUtils.verifyMine(findAnswer.getWriter().getEmail());
        answerRepository.delete(findAnswer);
    }

    @Transactional(readOnly = true)
    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);

        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }


}
