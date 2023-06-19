package synergy_overflow.question.sevice;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.helper.patchUtil.CustomBeanUtils;
import synergy_overflow.question.dto.QuestionVo;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.repository.QuestionRepository;
import synergy_overflow.question.temporaries.temporaryEntities.MemberEntity;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository repository;
    private final CustomBeanUtils<Question> editUtil;

    public QuestionService(QuestionRepository repository, CustomBeanUtils editUtil) {
        this.repository = repository;
        this.editUtil = editUtil;
    }

    public Question createQuestion(Question question){
        MemberEntity loggedIn = LoggedInMemberUtils.findLoggedInMember();
        loggedIn.setQuestions(question);

        return repository.save(question);
    }

    public Question getQuestion(long questionId){
        Question question = findExistsQuestion(questionId);
        question.setViews();

        return repository.save(question);
    }

    public Page<Question> getQuestions(int page, int size, String sort){
        return sortingQuestion(page,size,sort);
    }

    private Page<Question> sortingQuestion(int page, int size, String sort){
        if(sort.equals("answered")) return repository.findAllByAnswersIsNotNullOrderByQuestionIdDesc(PageRequest.of(page,size));
        else if(sort.equals("views")) return repository.findAll(PageRequest.of(page,size,Sort.by(sort).descending().and(Sort.by("questionId").descending())));
        else if(sort.equals("new")) return repository.findAll(PageRequest.of(page,size,Sort.by("questionId").descending()));
        else throw new BusinessLogicException(ExceptionCode.INVALID_SORT_PARAMETER);
    }

    public Question editQuestion(Question question){
        Question existQuestion = findExistsQuestion(question.getQuestionId());

        Question newQuestion = editUtil.copyNonNullProperties(question,existQuestion);

        return repository.save(newQuestion);
    }

    public void removeQuestion(long questionId){
        findExistsQuestion(questionId);
        repository.deleteById(questionId);
    }

    public Question findExistsQuestion(long questionId){
        Optional<Question> optionalQuestion = repository.findById(questionId);
        return optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }
}
