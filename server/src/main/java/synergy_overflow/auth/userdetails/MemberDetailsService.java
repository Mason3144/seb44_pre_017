package synergy_overflow.auth.userdetails;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.Optional;

// DB에서 조회한 회원의 인증 정보를 기반으로 인증 처리하는 클래스
@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final MemberAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository,
                                MemberAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );

        return new MemberDetails(findMember, authorityUtils);
    }
}
