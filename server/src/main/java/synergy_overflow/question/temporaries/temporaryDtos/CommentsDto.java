package synergy_overflow.question.temporaries.temporaryDtos;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class CommentsDto {
    @Builder
    @Getter
    public static class Response{
        private long answer_id;
        private long comment_id;
        private String comment_body;
        private LocalDateTime created_at;
        private WriterDto.Response writer;
    }
}
