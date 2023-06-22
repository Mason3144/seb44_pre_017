package synergy_overflow.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import synergy_overflow.member.dto.MemberDto;


import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;


public class AnswerDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class postDto{

        private long memberId;

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
    public static class responseDto{

        private long answerId;

        private String answerBody;

        private LocalDateTime createdAt;

        private boolean adopted;

        private MemberDto.Response Writer;

//        private List<CommentsDto.Response> comments;
    }
}
