package synergy_overflow.auth.oauth2;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.auth.utils.TokenUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.service.MemberService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.security.SecureRandom;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final MemberAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final TokenUtils tokenUtils;

    public OAuth2MemberSuccessHandler(MemberAuthorityUtils authorityUtils,
                                      MemberService memberService,
                                      TokenUtils tokenUtils) {
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.tokenUtils = tokenUtils;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        Member member;

        // 기존 회원인지 확인
        if (memberService.isExistMember(email)) {
            member = memberService.findMemberByEmail(email);
        } else { // 신규 회원인 경우 회원 생성 및 저장
            member = createNewMember(email);
            memberService.createMember(member);
        }

        redirect(request, response, member);
    }

    private Member createNewMember(String email) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(generateRandomPassword());
        member.setNickname(generateNicknameFromEmail(email));
        member.setRoles(authorityUtils.createRoles(email));

        return member;
    }

    // 임의의 비밀번호 생성
    private String generateRandomPassword() {
        int length = 10;
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

        SecureRandom random = new SecureRandom();
        String password = random
                .ints(length, 0, charset.length())
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return password;
    }

    // 이메일을 기반으로 닉네임 생성
    private String generateNicknameFromEmail(String email) {
        String nickname = email.split("@")[0];
        return nickname;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException {
        String accessToken = tokenUtils.delegateAccessToken(member
        );
        String refreshToken = tokenUtils.delegateRefreshToken(member);

        String uri = createURI(accessToken, refreshToken, member).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(String accessToken, String refreshToken, Member member) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("memberId", member.getMemberId().toString());
        queryParams.add("nickname", member.getNickname());

        // 컨트롤러로 보낸후 프론트로 리다이렉트 시도

        return UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("synergyoverflow.s3-website.ap-northeast-2.amazonaws.com")
//                .port(3000) // default
                .path("/oauth2/authorization/google/success")
                .queryParams(queryParams)
                .build().toUri();
    }
}
