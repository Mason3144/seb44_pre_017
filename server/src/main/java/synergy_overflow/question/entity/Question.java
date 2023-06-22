package synergy_overflow.question.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.adaption.entity.Adaption;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;
    @Column(nullable = false, length = 50)
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean adopted;
    @Column(nullable = false, columnDefinition = "integer default 0")
    private int views;

    public void setViews(){
        this.views++;
    }

    @OneToOne(mappedBy = "question", cascade = CascadeType.REMOVE)
    private Adaption adaption;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member writer;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new LinkedList<>();

    public void setAnswers(Answer answer){
        this.answers.add(answer);
        if(answer.getQuestion()!=this) answer.setQuestion(this);
    }
}
