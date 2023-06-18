package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;
import synergy_overflow.helper.validator.NotSpace;
import synergy_overflow.question.temporaries.temporaryDtos.AnswerDto;
import synergy_overflow.question.temporaries.temporaryDtos.WriterDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Builder
    @Getter
    public static class Post{
        @NotBlank
        @Size(min = 0, max = 50)
        private String title;
        @NotBlank
        @Size(min = 20, max = 255)
        private String body;
    }
    @Builder
    @Getter
    public static class Patch{
        @NotSpace
        @Size(min = 0, max = 50)
        private String title;
        @NotSpace
        @Size(min = 20, max = 255)
        private String body;

    }
    @Builder
    @Getter
    public static class Response{
        private long question_id;
        private String title;
        private String body;
        private LocalDateTime created_at;
        private WriterDto.Response writer;
        private List<AnswerDto.Response> answers;
    }
}
