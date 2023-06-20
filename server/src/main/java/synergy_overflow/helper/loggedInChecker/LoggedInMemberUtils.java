package synergy_overflow.helper.loggedInChecker;

import org.springframework.security.core.context.SecurityContextHolder;
import synergy_overflow.auth.filter.JwtVerificationFilter;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.member.entity.Member;

public class LoggedInMemberUtils {
    // 임시로 만든 로그인 멤버 찾는 메서드 입니다. 시큐리티 적용 이후 새로 로직 적용 필요합니다.
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
