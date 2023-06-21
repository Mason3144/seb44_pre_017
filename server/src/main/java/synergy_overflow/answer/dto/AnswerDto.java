package synergy_overflow.answer.dto;


import lombok.Getter;
import lombok.Setter;
import synergy_overflow.member.dto.MemberDto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @Setter
    public static class postDto{
        @NotBlank
        private String body;
    }

    @Getter
    @Setter
    public static class patchDto{

        private long answerId;
        @NotBlank
        private String body;


    }

    @Getter
    @Setter
    public static class responseDto{

        private long answerId;

        @NotBlank
        private String body;

        private boolean adopted;

        private LocalDateTime createdAt;

        private MemberDto.Response writer;
    }
}
