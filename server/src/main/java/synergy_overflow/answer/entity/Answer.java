package synergy_overflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.adaption.entity.Adoption;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;
import synergy_overflow.question.entity.Question;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answerBody;
    @Column(nullable = false,columnDefinition = "boolean default false")
    private boolean adopted;

    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "question_id",nullable = false)
    private Question question;

    @OneToOne(mappedBy = "answer", cascade = {CascadeType.REMOVE,CascadeType.REFRESH})
    private Adoption adoption;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new LinkedList<>();

    public void setComments(Comment comment){
        this.comments.add(comment);
        if(comment.getAnswer()!=this) comment.setAnswer(this);
    }


}
