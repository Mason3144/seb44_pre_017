package synergy_overflow.auth.utils;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import synergy_overflow.exception.errorResponse.ErrorResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// ErrorResponse를 출력 스트림으로 생성하는 클래스
public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(JsonUtil.toJson(errorResponse, ErrorResponse.class));
    }
    public static void sendErrorResponse(HttpServletResponse response,HttpStatus status, Exception exception) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(status, exception.getMessage());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(JsonUtil.toJson(errorResponse, ErrorResponse.class));
    }
}
