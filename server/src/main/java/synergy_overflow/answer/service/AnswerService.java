package synergy_overflow.answer.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.repository.AnswerRepository;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.service.MemberService;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.service.QuestionService;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final QuestionService questionService;

    private final MemberService memberService;

    public Answer createAnswer(Answer answer, long questionId) {
        Member member = memberService.findMemberByEmail(LoggedInMemberUtils.findLoggedInMember());
        member.setAnswers(answer);

        Question question = questionService.findExistsQuestion(questionId);
        question.setAnswers(answer);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        LoggedInMemberUtils.verifyMine(findAnswer.getWriter().getEmail());

        findAnswer.setAnswerBody(answer.getAnswerBody());

        return answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        LoggedInMemberUtils.verifyMine(findAnswer.getWriter().getEmail());
        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);

        Answer findAnswer =
                optionalAnswer.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
