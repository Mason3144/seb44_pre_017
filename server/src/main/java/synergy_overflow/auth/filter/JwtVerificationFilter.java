package synergy_overflow.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import synergy_overflow.auth.jwt.JwtTokenizer;
import synergy_overflow.auth.utils.MemberAuthorityUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import static synergy_overflow.auth.utils.TokenType.AUTHORIZATION;
import static synergy_overflow.auth.utils.TokenType.BEARER;

/*
 클라이언트 측에서 전송된 request header에 포함된 JWT 검증을 위한 필터
 request 당 한 번 수행하므로 OncePerRequestFilter 이용

 검증이 끝나면 SecurityHolder를 이용해 SecurityContext에 인증된 Authentication을 저장
 */
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 MemberAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    // 예외처리 로직 추가
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        }
       /* catch (SignatureException se) {
            request.setAttribute("exception", se);
        } */ catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    // request 헤더 값이 null 이거나 Bearer로 시작하지 않는다면 해당 필터의 동작을 수행하지 않고 다음 필터로 건너뜀
    // JWT 가 헤더에 포함되지 않은 경우를 의미함
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader(AUTHORIZATION.getType());

        return authorization == null || !authorization.startsWith(BEARER.getType());
    }

    // JWT 검증 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader(AUTHORIZATION.getType()).replace(BEARER.getType(), "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        // claims를 파싱해서 성공하면 JWT 검증되었다는 의미
        return claims;
    }

    // Authentication 객체를 SecurityContext에 저장하기 위한 메서드
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
