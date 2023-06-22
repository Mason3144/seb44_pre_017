package synergy_overflow.adaption.entity;

import lombok.Setter;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.question.entity.Question;

import javax.persistence.*;

@Entity
@Setter
public class Adaption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AdaptionId;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

}
