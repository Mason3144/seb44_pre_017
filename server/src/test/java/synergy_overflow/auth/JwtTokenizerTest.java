package synergy_overflow.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.io.Decoders;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class JwtTokenizerTest {
    private static JwtTokenizer jwtTokenizer;
    private String secretKey;
    private String base64EncodedSecretKey;

    @BeforeAll
    public void init() {
        jwtTokenizer = new JwtTokenizer();
        secretKey = "hgd12345612345612341235451263124124";
        base64EncodedSecretKey =
                jwtTokenizer.encodedBase64SecretKey(secretKey);
    }

    @Test
    @DisplayName("plain text에서 Base64 형식으로 인코딩되는지 테스트")
    public void encodedBase64SecretKeyTest() {
        assertThat(secretKey, is(new String(Decoders.BASE64.decode(base64EncodedSecretKey))));
    }

    @Test
    @DisplayName("signature 검증 통과 테스트")
    public void verifySignatureTest() {
        int timeUnit = Calendar.MINUTE;
        int timeAmount = 10;
        String accessToken = getAccessToken(timeUnit, timeAmount);

        assertDoesNotThrow(
                () -> jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey)
        );
    }

    @Test
    @DisplayName("JWT 만료 테스트")
    public void verifyExpirationTest() throws InterruptedException {
        int timeUnit = Calendar.SECOND;
        int timeAmount = 1;
        String accessToken = getAccessToken(timeUnit, timeAmount);

        assertDoesNotThrow(
                () -> jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey)
        );

        // 지연시간을 준 뒤, JWT가 정상적으로 만료되는지 테스트
        TimeUnit.MILLISECONDS.sleep(1500);

        assertThrows(ExpiredJwtException.class,
                () -> jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey));
    }


    @Test
    @DisplayName("액세스 토큰 생성 테스트")
    public void generateAccessTokenTest() {
        int timeUnit = Calendar.MINUTE;
        int timeAmount = 10;
        String accessToken = getAccessToken(timeUnit, timeAmount);

        assertThat(accessToken, notNullValue());
    }

    @Test
    @DisplayName("리프레시 토큰 생성 테스트")
    public void generateRefreshTokenTest() {
        String subject = "test refresh token";
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, 24);
        Date expiration = calendar.getTime();

        String refreshToken = jwtTokenizer.generateRefreshToken(
                subject, expiration, base64EncodedSecretKey);

        assertThat(refreshToken, notNullValue());
    }

    private String getAccessToken(int timeUnit, int timeAmount) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", 1);
        claims.put("roles", List.of("USER"));

        String subject = "access token test";
        Calendar calendar = Calendar.getInstance();
        calendar.add(timeUnit, timeAmount);
        Date expiration = calendar.getTime();

        String accessToken = jwtTokenizer.generateAccessToken(
                claims, subject, expiration, base64EncodedSecretKey
        );

        return accessToken;
    }
}