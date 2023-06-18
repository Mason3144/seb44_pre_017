package synergy_overflow.question.temporaries.temporaryDtos;

import lombok.Builder;
import lombok.Getter;

public class WriterDto {

    @Builder
    @Getter
    public static class Response{
        private long member_id;
        private String nickname;
    }
}
