package synergy_overflow.member.dto;

import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class MemberDto {

    // 회원가입 request Dto
    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "이메일을 입력해 주세요.")
        @Email(message = "이메일 형식으로 작성해주세요.")
        private String email;

        @NotBlank(message = "비밀번호를 입력해 주세요")
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*\\W).{6,20}",
                message = "비밀번호는 영문 대 소문자,숫자,특수문자를 포함하여 6자 이상 작성해 주세요")
        private String password;

        @NotBlank(message = "닉네임을 입력해 주세요.")
        private String nickname;
    }
    // 로그인 request Dto
    @Getter
    @Setter
    public static class LoginRequest{

        @NotBlank(message = "이메일을 입력해 주세요.")
        @Email(message = "이메일 형식으로 작성해주세요.")
        private String email;

        @NotBlank(message = "비밀번호를 입력해 주세요")
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*\\W).{6,20}",
                message = "비밀번호는 영문 대 소문자,숫자,특수문자를 포함하여 6자 이상 작성해 주세요")
        private String password;
    }
//// 토큰 Response dto
//    @RequiredArgsConstructor
//    @Getter
//    public static class LoginResponse{
//        private final String acessToken;
//    }

    // 회원 수정 request Dto
    @Getter
    @Setter
    public static class Patch{
        private Long memberId;

        @NotBlank(message = "비밀번호를 입력해 주세요")
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*\\W).{6,20}",
                message = "비밀번호는 영문 대 소문자,숫자,특수문자를 포함하여 6자 이상 작성해 주세요")
        private String password;

        @NotBlank(message = "닉네임을 입력해 주세요.")
        private String nickname;
    }

    // Response Dto
    @Getter
    @Setter
    public static class Response{
        private Long memberId;

        private String email;

        private String nickname;

    }
}
