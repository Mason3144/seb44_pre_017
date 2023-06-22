package synergy_overflow.adaption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import synergy_overflow.adaption.entity.Adaption;

public interface AdaptionRepository extends JpaRepository<Adaption,Long> {
}
