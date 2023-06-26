package synergy_overflow.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import synergy_overflow.member.dto.MemberDto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Post {
        private long commentId;
        @NotBlank
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    @Builder
    @Setter
    public static class Response {
        private long answerId;
        private long commentId;
        private String commentBody;
        private LocalDateTime createdAt;
        private MemberDto.Response writer;
    }
}
