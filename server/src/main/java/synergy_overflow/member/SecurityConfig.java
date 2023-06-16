package synergy_overflow.member;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    //private final JWTprovider jwTprovider;

    protected void configure(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()  // (1) 웹 브라우저에서 H2 웹 콘솔을 정상적으로 사용하기 위한 설정
                .and()
                .csrf().disable()
                .formLogin()
                .loginPage("/auth/login")
                .loginProcessingUrl("/auth/login") // 여기 api 경로를 정해야함 -> 커스텀 로그인 페이지 경로
                .failureUrl("/auths/login-form?error") // ->로그인 인증 실패할 경우 경로
                .and()
                .logout()
                .logoutUrl("/logout") // 로그아웃 url api
                .logoutSuccessUrl("/") // 로그아웃 실패시 api
                .and()
                .exceptionHandling().accessDeniedPage("/auths/access-denied") // 접근 거부 api
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/members/**").hasRole("USER") // ***회원 정보 비로그인시에도 가능?
                        .antMatchers("/questions/{question-id}/**").hasRole("USER") // 한건의 질문조회 이거 바꿔야할 듯합니다.
                        .antMatchers("/questions/ask").hasRole("USER")
                        .antMatchers("⁄**").permitAll()
                );
    }


}
