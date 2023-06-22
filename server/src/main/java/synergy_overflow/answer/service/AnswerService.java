package synergy_overflow.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.adaption.repository.AdoptionRepository;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.repository.AnswerRepository;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.repository.QuestionRepository;
import synergy_overflow.question.service.QuestionService;


import java.util.Optional;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final MemberRepository memberRepository;

    private final QuestionRepository questionRepository;

    private final QuestionService questionService;

    private final AdoptionRepository adoptionRepository;

    public AnswerService(AnswerRepository answerRepository, MemberRepository memberRepository, QuestionRepository questionRepository, QuestionService questionService, AdoptionRepository adoptionRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.questionService = questionService;
        this.adoptionRepository = adoptionRepository;
    }

    public Answer createAnswer(Answer answer, long questionId){
        Member member = memberRepository.findByEmail(LoggedInMemberUtils.findLoggedInMember()).get();

        member.setAnswers(answer);

        Question question = questionRepository.findById(questionId).get();
        question.setAnswers(answer);

        return answerRepository.save(answer);
    }

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

    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);

        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }


}
