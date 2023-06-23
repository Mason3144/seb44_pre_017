package synergy_overflow.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import synergy_overflow.auth.dto.LoginResponse;
import synergy_overflow.auth.utils.JsonUtil;
import synergy_overflow.auth.utils.TokenUtils;
import synergy_overflow.member.entity.Member;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static synergy_overflow.auth.utils.TokenType.*;

/*
    회원 인증 성공시 호출되는 핸들러
    토큰 발급 후, 성공 로그 남김
*/
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final TokenUtils tokenUtils;

    public MemberAuthenticationSuccessHandler(TokenUtils tokenUtils) {
        this.tokenUtils = tokenUtils;
    }

    // 인증 성공 시 토큰 발급
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authResult) throws IOException, ServletException {

        // 내부적으로 인증에 성공하면 멤버 객체가 할당됨
        Member member = (Member) authResult.getPrincipal();

        String accessToken = tokenUtils.delegateAccessToken(member);
        String refreshToken = tokenUtils.delegateRefreshToken(member);
        String loginResponse = getLoginResponseJson(member);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader(AUTHORIZATION.getType(), BEARER.getType() + accessToken);
        response.setHeader(REFRESH.getType(), refreshToken);
        response.getWriter().write(loginResponse);

        log.info("# Authenticated Successfully!");
    }

    // 로그인 response를 Json 형식으로 반환
    private String getLoginResponseJson(Member member) {
        long memberId = member.getMemberId();
        String nickname = member.getNickname();

        LoginResponse response = new LoginResponse(memberId, nickname);
        return JsonUtil.toJson(response, LoginResponse.class);
    }
}
