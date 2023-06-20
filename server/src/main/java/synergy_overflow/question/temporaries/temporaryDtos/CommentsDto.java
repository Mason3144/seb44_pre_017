package synergy_overflow.question.temporaries.temporaryDtos;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class CommentsDto {
    @Builder
    @Getter
    public static class Response{
        private long answerId;
        private long commentId;
        private String commentBody;
        private LocalDateTime createdAt;
        private WriterDto.Response writer;
    }
}
