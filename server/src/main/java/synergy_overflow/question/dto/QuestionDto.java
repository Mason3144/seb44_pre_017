package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class QuestionDto {


    // test용 입니다.
    @Builder
    @Getter
    public static class Request{
        @NotBlank
        private String title;
    }
}
