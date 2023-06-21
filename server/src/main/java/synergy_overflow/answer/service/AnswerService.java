package synergy_overflow.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.repository.AnswerRepository;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;

    private final MemberRepository memberRepository;

    public AnswerService(AnswerRepository answerRepository,MemberRepository memberRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
    }


    public Answer createAnswer(Answer answer){
//        Member member = memberRepository.findByEmail(LoggedInMemberUtils.findLoggedInMember()).get();
//        member.setAnswers(answer);
        return answerRepository.save(answer);

    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer adotp(long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAdopted(true);

        return answerRepository.save(findAnswer);
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer unAdotp(long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setAdopted(false);

        return answerRepository.save(findAnswer);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Answer updateAnswer(Answer answer){
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        findAnswer.setAnswerBody(answer.getAnswerBody());

        return answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
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
