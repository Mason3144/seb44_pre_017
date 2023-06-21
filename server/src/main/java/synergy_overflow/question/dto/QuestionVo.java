package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;

public class QuestionVo {
    @Builder
    @Getter
    public static class Filter{
        private Type type;
        public enum Type{
            NEW_QUESTION("questionId"),
            MOST_COMMENTS("answers"), // jpql?
            MOST_VIEWS("views");
            @Getter
            private String type;

            Type(String type) {
                this.type = type;
            }
        }
    }
}
