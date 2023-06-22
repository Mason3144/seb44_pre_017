package synergy_overflow.adaption.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.adaption.entity.Adoption;
import synergy_overflow.adaption.repository.AdoptionRepository;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.answer.service.AnswerService;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.service.QuestionService;

import java.util.Optional;

@Service
@Transactional
public class AdoptionService {

    private final AdoptionRepository adoptionRepository;
    private final AnswerService answerService;
    private final QuestionService questionService;

    public AdoptionService(AdoptionRepository adoptionRepository, AnswerService answerService, QuestionService questionService) {
        this.adoptionRepository = adoptionRepository;
        this.answerService = answerService;
        this.questionService = questionService;
    }

    public Answer createAdoption(long answerId, long questionId) {
        verifyExistsAdoption(questionId);

        Question question = questionService.findExistsQuestion(questionId);
        Answer answer = answerService.findVerifiedAnswer(answerId);

        question.setAdopted(true);
        answer.setAdopted(true);

        Adoption adoption = new Adoption();
        adoption.setQuestion(question);
        adoption.setAnswer(answer);

        adoptionRepository.save(adoption);

        return answer;
    }

    public Answer deleteAdaption(long answerId, long questionId) {
        Adoption adoption = findExistsAdoption(questionId);

        Answer answer = answerService.findVerifiedAnswer(answerId);
        Question question = questionService.findExistsQuestion(questionId);

        answer.setAdopted(false);
        question.setAdopted(false);

        adoptionRepository.delete(adoption);

        return answer;
    }

    // adoption이 존재하면 예외발생
    private void verifyExistsAdoption(long questionId) {
        Optional<Adoption> adoption = adoptionRepository.findByQuestionId(questionId);

        if (adoption.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ADOPTION_EXISTS);
        }
    }

    //adoption이 존재하지 않으면 예외발생
    private Adoption findExistsAdoption(long questionId) {
        Optional<Adoption> optionalAdoption = adoptionRepository.findByQuestionId(questionId);
        return optionalAdoption.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ADOPTION_NOT_FOUND));
    }
}
