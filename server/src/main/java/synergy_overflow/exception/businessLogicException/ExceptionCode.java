package synergy_overflow.exception.businessLogicException;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NOT_AUTHORIZED(403,"Member not authorized"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
