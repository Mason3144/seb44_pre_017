package synergy_overflow.question.temporaries.temporaryApp;

import org.springframework.data.jpa.repository.JpaRepository;
import synergy_overflow.question.temporaries.temporaryEntities.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
}
