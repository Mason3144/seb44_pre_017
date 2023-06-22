package synergy_overflow.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


public class MemberDto {
    @Getter
    @AllArgsConstructor
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

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotBlank(message = "비밀번호를 입력해 주세요")
        @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*\\W).{6,20}",
                message = "비밀번호는 영문 대 소문자,숫자,특수문자를 포함하여 6자 이상 작성해 주세요")
        private String password;

        @NotBlank(message = "닉네임을 입력해 주세요.")
        private String nickname;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {
        private long memberId;
        private String nickname;
    }
}
