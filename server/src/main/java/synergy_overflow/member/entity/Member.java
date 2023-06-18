package synergy_overflow.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import synergy_overflow.helper.auditable.Auditable;

import javax.persistence.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


// 회원 entity
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Override
    public String getName() {
        return getEmail();
    }

    public enum MemberRole {
        ROLE_USER
    }
}
