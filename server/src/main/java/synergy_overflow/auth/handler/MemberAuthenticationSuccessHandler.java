package synergy_overflow.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import synergy_overflow.auth.dto.LoginResponse;
import synergy_overflow.auth.jwt.JwtTokenizer;
import synergy_overflow.auth.utils.JsonUtil;
import synergy_overflow.member.entity.Member;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static synergy_overflow.auth.utils.TokenType.*;

/*
    회원 인증 성공시 호출되는 핸들러
    토큰 발급 후, 성공 로그 남김
*/
@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;

    public MemberAuthenticationSuccessHandler(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    // 인증 성공 시 토큰 발급
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authResult) throws IOException, ServletException {

        // 내부적으로 인증에 성공하면 멤버 객체가 할당됨
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);
        String loginResponse = getLoginResponseJson(member);

        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
        response.setHeader(AUTHORIZATION.getType(), BEARER.getType() + accessToken);
        response.setHeader(REFRESH.getType(), refreshToken);
        response.getWriter().write(loginResponse);

        log.info("# Authenticated Successfully!");
    }

    // claims 추가해서 access 토큰 생성
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());
        claims.put("nickname", member.getNickname());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    // 로그인 response를 Json 형식으로 반환
    private String getLoginResponseJson(Member member) {
        long memberId = member.getMemberId();
        String nickname = member.getNickname();

        LoginResponse response = new LoginResponse(memberId, nickname);
        return JsonUtil.toJson(response, LoginResponse.class);
    }
}
