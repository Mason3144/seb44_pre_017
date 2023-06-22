package synergy_overflow.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.helper.audit.Auditable;
import synergy_overflow.question.entity.Question;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "writer", cascade = CascadeType.REMOVE)
    private List<Answer> answers =  new ArrayList<>();

    public void setAnswers(Answer answer){
       this.answers.add(answer);
       if(answer.getWriter() != this) answer.setWriter(this);
    }

    public void addQuestions(Question question) {
        this.questions.add(question);
        if (question.getWriter() != this) {
            question.setWriter(this);
        }
    }

    public void addComments(Comment comment) {
        this.comments.add(comment);
        if (comment.getWriter() != this) {
            comment.setWriter(this);
        }
    }

    public Member(String email) {
        this.email = email;
    }

    @Override
    public String getName() {
        return getEmail();
    }

    public enum MemberRole {
        ROLE_USER
    }
}
