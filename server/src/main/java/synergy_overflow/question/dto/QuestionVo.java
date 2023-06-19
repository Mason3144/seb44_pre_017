package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;

public class QuestionVo {
    @Builder
    @Getter
    public static class Filter{
        private Type type;
        public enum Type{
            NEW_QUESTION("NEW_QUESTION"),
            NEW_COMMENT("NEW_COMMENT"),
            MOST_VIEWS("MOST_VIEWS");
            @Getter
            private String type;

            Type(String type) {
                this.type = type;
            }
        }
    }
}
