package synergy_overflow.question.temporaries.temporaryEntities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.auditable.Auditable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class CommentEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long comment_id;
    @Column(nullable = false)
    private String comment_body;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private MemberEntity writer;
    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = false)
    private AnswerEntity answer;
}
