package synergy_overflow.auth.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class LoginDto {
    @NotNull
    private String username;

    @NotBlank(message = "비밀번호를 입력해 주세요")
    @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9])(?=.*\\W).{6,20}",
            message = "비밀번호는 영문 대 소문자,숫자,특수문자를 포함하여 6자 이상 작성해 주세요")
    private String password;
}
