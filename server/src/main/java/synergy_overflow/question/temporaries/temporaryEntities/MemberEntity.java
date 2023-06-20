package synergy_overflow.question.temporaries.temporaryEntities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.auditable.Auditable;
import synergy_overflow.question.entity.Question;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class MemberEntity extends Auditable {
    public MemberEntity(long memberId) {
        this.memberId = memberId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false,length = 30)
    private String email;
    @Column(nullable = false,length = 20)
    private String nickname;

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<Question> questions = new LinkedList<>();
    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<AnswerEntity> answers = new LinkedList<>();
    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments = new LinkedList<>();

    public void setQuestions(Question question){
        this.questions.add(question);
        if(question.getWriter()!=this) question.setWriter(this);
    }
    public void setAnswers(AnswerEntity answer){
        this.answers.add(answer);
        if(answer.getWriter()!=this) answer.setWriter(this);
    }
    public void setComments(CommentEntity comment){
        this.comments.add(comment);
        if(comment.getWriter()!=this) comment.setWriter(this);
    }




}
