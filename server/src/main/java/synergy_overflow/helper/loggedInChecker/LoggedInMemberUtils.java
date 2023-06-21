package synergy_overflow.helper.loggedInChecker;

import org.springframework.security.core.context.SecurityContextHolder;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;

public class LoggedInMemberUtils {
    public static String findLoggedInMember(){
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
    }
    public static boolean verifyIsMine(String memberEmail){
        String loggedInMember = findLoggedInMember();
        return loggedInMember.equals(memberEmail);
    }
    public static void verifyIfNotMineException(String memberEmail){
    if(!verifyIsMine(memberEmail))
        throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
    }
}

