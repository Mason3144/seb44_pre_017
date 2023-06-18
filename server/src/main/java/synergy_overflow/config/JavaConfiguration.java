package synergy_overflow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.member.repository.MemberRepository;
import synergy_overflow.member.service.DBMemberService;
import synergy_overflow.member.service.MemberService;

@Configuration
public class JavaConfiguration {
    @Bean
    public MemberService dbMemberService(MemberRepository memberRepository,
                                         PasswordEncoder passwordEncoder,
                                         MemberAuthorityUtils authorityUtils) {
        return new DBMemberService(memberRepository, passwordEncoder, authorityUtils);
    }
}
