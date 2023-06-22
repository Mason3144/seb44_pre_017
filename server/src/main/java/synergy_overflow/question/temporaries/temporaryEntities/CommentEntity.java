package synergy_overflow.question.temporaries.temporaryEntities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class CommentEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    @Column(nullable = false)
    private String commentBody;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;
    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = false)
    private AnswerEntity answer;
}