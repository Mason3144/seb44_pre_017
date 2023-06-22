package synergy_overflow.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.member.dto.MemberDto;


import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;


public class AnswerDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class postDto{

        private long questionId;

        @NotBlank
        private String answerBody;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class patchDto{

        private long answerId;

        @NotBlank
        private String answerBody;


    }
    @AllArgsConstructor
    @Getter
    @Setter
    @Builder
    public static class Response{

        private long answerId;

        private String answerBody;

        private LocalDateTime createdAt;

        private boolean adopted;

        private MemberDto.Response writer;

        private List<CommentDto.Response> comments;
    }
}
