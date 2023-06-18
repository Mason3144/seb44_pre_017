package synergy_overflow.question.temporaries.temporaryDtos;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {
    @Builder
    @Getter
    public static class Response{
        private long answer_id;
        private String answer_body;
        private LocalDateTime created_at;
        private boolean adopted;
        private WriterDto.Response writer;
        private List<CommentsDto.Response> comments;
    }
}
