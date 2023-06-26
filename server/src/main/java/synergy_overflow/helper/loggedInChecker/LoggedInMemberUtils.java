package synergy_overflow.helper.loggedInChecker;

import org.springframework.security.core.context.SecurityContextHolder;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;

import java.util.Map;

public class LoggedInMemberUtils {
    // 로그인된 유저 이메일 반환
    public static String findLoggedInMember() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
    }

    // 로그인된 유저의 이메일과 매개변수 이메일이 같은지 불리언으로 반환
    public static boolean isMine(String memberEmail) {
        String loggedInMember = findLoggedInMember();
        return loggedInMember.equals(memberEmail);
    }

    // 로그인된 유저의 이메일과 매개변수의 이메일이 다를경우 예외 반환
    public static void verifyMine(String memberEmail) {
        if (!isMine(memberEmail))
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
    }
}

