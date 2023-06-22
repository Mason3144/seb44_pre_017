package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.helper.validator.NotSpace;
import synergy_overflow.member.dto.MemberDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Builder
    @Getter
    public static class Post {
        @NotBlank
        @Size(min = 0, max = 50)
        private String title;
        @NotBlank
        @Size(min = 20, max = 255)
        private String body;
    }

    @Builder
    @Getter
    @Setter
    public static class Patch {
        private long questionId;
        @NotSpace
        @Size(min = 0, max = 50)
        private String title;
        @NotSpace
        @Size(min = 20, max = 255)
        private String body;

    }

    @Builder
    @Getter
    @Setter
    public static class Response {
        private long questionId;
        private String title;
        private String body;
        private LocalDateTime createdAt;
        private MemberDto.Response writer;
        private List<AnswerDto.Response> answers;
    }
}