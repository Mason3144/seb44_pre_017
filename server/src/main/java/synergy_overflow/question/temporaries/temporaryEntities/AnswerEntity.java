package synergy_overflow.question.temporaries.temporaryEntities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.auditable.Auditable;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.CommentsDto;
import synergy_overflow.question.temporaries.temporaryDtos.WriterDto;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class AnswerEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;
    @Column(nullable = false,columnDefinition = "TEXT")
    private String answerBody;
    @Column(nullable = false,columnDefinition = "boolean default false")
    private boolean adopted;



    @ManyToOne
    @JoinColumn(name = "member_id",nullable = false)
    private MemberEntity writer;
    @ManyToOne
    @JoinColumn(name = "question_id",nullable = false)
    private Question question;
    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments;
    public void setComments(CommentEntity comment){
        this.comments.add(comment);
        if(comment.getAnswer()!=this) comment.setAnswer(this);
    }

}
