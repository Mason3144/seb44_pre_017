package synergy_overflow.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import synergy_overflow.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
