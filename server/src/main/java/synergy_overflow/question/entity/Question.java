package synergy_overflow.question.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.auditable.Auditable;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;
}
