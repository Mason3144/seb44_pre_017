package synergy_overflow.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import synergy_overflow.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByAnswersIsNotNullOrderByQuestionIdDesc(Pageable pageable);
}
