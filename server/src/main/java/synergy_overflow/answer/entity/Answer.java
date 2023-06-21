package synergy_overflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.member.entity.Member;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String answerBody;

    @Column(nullable = false,columnDefinition = "boolean default false")
    private boolean adopted;


//    @ManyToOne
//    @JoinColumn(name = "merber_id",nullable = false)
//    private Member writer;


}
