package synergy_overflow.question.temporaries.temporaryDtos;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {
    @Builder
    @Getter
    public static class Post{
        private long answerId;
        private String body;
    }
    @Builder
    @Getter
    public static class Response{
        private long answerId;
        private String answerBody;
        private LocalDateTime createdAt;
        private boolean adopted;
        private WriterDto.Response writer;
        private List<CommentsDto.Response> comments;
    }
}
