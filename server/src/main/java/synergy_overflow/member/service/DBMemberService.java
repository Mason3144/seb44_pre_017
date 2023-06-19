/*
package synergy_overflow.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.List;

@Transactional
public class DBMemberService implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthorityUtils authorityUtils;

    public DBMemberService(MemberRepository memberRepository,
                           PasswordEncoder passwordEncoder,
                           MemberAuthorityUtils authorityUtils
    ) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    // 회원 정보 DB에 등록
    public Member createMember(Member member) {
        // TODO 이메일 검증
        // verifyExistEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // Role을 DB에 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    @Override
    public Member findMember(String email) {
        return null;
    }
}
*/
