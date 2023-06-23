package synergy_overflow.adaption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import synergy_overflow.adaption.entity.Adoption;

import java.util.Optional;

public interface AdoptionRepository extends JpaRepository<Adoption, Long> {
    // Question ID로 연관된 Adoption 찾기
    @Query(value = "select * from adoption a where a.question_id = :questionId ", nativeQuery = true)
    Optional<Adoption> findByQuestionId(Long questionId);
}
