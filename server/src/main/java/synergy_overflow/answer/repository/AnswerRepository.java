package synergy_overflow.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import synergy_overflow.answer.entity.Answer;


public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
