package synergy_overflow.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import synergy_overflow.member.dto.MemberDto;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        @Max(255)
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long answerId;
        private long commentId;
        private String commentBody;
        private LocalDateTime createdAt;
        private MemberDto.Response writer;
    }
}
