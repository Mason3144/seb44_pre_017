package synergy_overflow.question.sevice;


import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import synergy_overflow.question.dto.QuestionVo;
import synergy_overflow.question.entity.Question;

import javax.transaction.Transactional;

@Service
@Transactional
public class QuestionService {
    public Question createQuestion(Question question){

        return null;
    }

    public Question getQuestion(long questionId){
        return null;
    }

    public Page<Question> getQuestions(int page, int size, QuestionVo.Filter filter){
        return null;
    }

    public Question editQuestion(Question question){
        return null;
    }

    public Question removeQuestion(long questionId){
        return null;
    }
}
