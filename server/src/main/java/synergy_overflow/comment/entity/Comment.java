package synergy_overflow.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answer;
}
