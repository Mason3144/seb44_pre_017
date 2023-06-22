package synergy_overflow.question.temporaries.temporaryDtos;


import lombok.Builder;
import lombok.Getter;

public class WriterDto {
    @Builder
    @Getter
    public static class Post{
        private String nickname;
        private String email;
        private String password;
    }
    @Builder
    @Getter
    public static class Response{
        private long memberId;
        private String nickname;
    }
}