package synergy_overflow.auth.userdetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.member.entity.Member;

import java.util.Collection;

// DB에 저장된 username, password(credential), 권한 정보를 포함한 컴포넌트
public class MemberDetails extends Member implements UserDetails {
    private final MemberAuthorityUtils authorityUtils;

    public MemberDetails(Member member, MemberAuthorityUtils authorityUtils) {
        this.authorityUtils = authorityUtils;
        setMemberId(member.getMemberId());
        setEmail(member.getEmail());
        setPassword(member.getPassword());
        setNickname(member.getNickname());
        setRoles(member.getRoles());
    }

    // DB에서 조회한 회원의 이메일 정보를 이용해 Role 기반의 권한 정보 컬렉션을 생성
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorityUtils.createAuthorities(this.getRoles());
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}