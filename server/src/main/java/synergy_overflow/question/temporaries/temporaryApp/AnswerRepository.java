package synergy_overflow.question.temporaries.temporaryApp;

import org.springframework.data.jpa.repository.JpaRepository;
import synergy_overflow.question.temporaries.temporaryEntities.AnswerEntity;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Long> {
}
