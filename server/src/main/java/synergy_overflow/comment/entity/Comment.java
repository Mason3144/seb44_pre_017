package synergy_overflow.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;
import synergy_overflow.question.temporaries.temporaryEntities.AnswerEntity;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false, columnDefinition = "CONTENT")
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = false)
    private AnswerEntity answer; // TODO Answer로 수정, Answer에 연관관계 매핑
}
