package synergy_overflow.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import synergy_overflow.auth.filter.JwtAuthenticationFilter;
import synergy_overflow.auth.filter.JwtVerificationFilter;
import synergy_overflow.auth.handler.MemberAccessDeniedHandler;
import synergy_overflow.auth.handler.MemberAuthenticationEntryPoint;
import synergy_overflow.auth.handler.MemberAuthenticationFailureHandler;
import synergy_overflow.auth.handler.MemberAuthenticationSuccessHandler;
import synergy_overflow.auth.jwt.JwtTokenizer;
import synergy_overflow.auth.utils.MemberAuthorityUtils;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 MemberAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    // HttpSecurity를 통해 HTTP 요청에 대한 보안 설정 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().sameOrigin()// 동일 출처로부터 들어오는 요청만 렌더링 허용

                .and()
                .csrf().disable()
                .cors(withDefaults()) //CorsConfigurationSource로 등록된 Bean을 이용하여 CORS 처리

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 생성하지 않도록 설정

                .and()
                .formLogin().disable()
                .httpBasic().disable()

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())

                .and()
                .apply(new CustomFilterConfigurer())

                .and()
                .authorizeHttpRequests(authorize -> authorize // 접근 권한 인가
                                // 전체 허용
                                .antMatchers(GET, "/").permitAll()  // 홈
                                .antMatchers(POST, "/auth/login").permitAll()   // 폼 로그인
                                .antMatchers(POST, "/members").permitAll()
                                .antMatchers(GET, "/oauth2/authorization/google").permitAll()   // oauth
                                .antMatchers(GET, "/questions/board").permitAll()   // 전체 질문 게시판 조회
                                .antMatchers(GET, "/questions/{question-id}/**").permitAll() // 한 건의 질문과 답변 조회

                                // TODO 전체 허용을 제외한 나머지는 모두 회원 조회 가능으로 변경?
                                .anyRequest().hasRole("USER")
                );

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // JwtAuthenticationFilter 등록하는 클래스
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager =
                    builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(jwtTokenizer));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // Spring Security Filter Chain에 추가
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    // 구체적인 CORS 정책 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 Origin에 대해 스크립트 기반의 HTTP 통신을 허용
        configuration.setAllowedOrigins(Arrays.asList("*"));
        // 파라미터로 지정한 메서드에 대한 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
