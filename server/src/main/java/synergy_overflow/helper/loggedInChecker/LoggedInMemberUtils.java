package synergy_overflow.helper.loggedInChecker;

import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.question.temporaries.temporaryEntities.MemberEntity;

public class LoggedInMemberUtils {
    // 임시로 만든 로그인 멤버 찾는 메서드 입니다. 시큐리티 적용 이후 새로 로직 적용 필요합니다.
    public static MemberEntity findLoggedInMember(){
        return new MemberEntity(1L);
    }
    public static boolean verifyIsMine(long memberId){
        MemberEntity loggedInMember = findLoggedInMember();
        try{
            return loggedInMember.getMember_id() == memberId;
        }catch (NullPointerException e){
            return false;
        }
    }
        public static void verifyIsMineException(long memberId){
        if(!verifyIsMine(memberId))
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
    }



    // 이전에 솔로 프로젝트때 만들어 둔 로직입니다. 시큐리티 적용 이후 참고하시면 됩니다.
//    public static JwtVerificationFilter.AuthenticatedPrincipal findLoggedInMember(){
//        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        if(user instanceof JwtVerificationFilter.AuthenticatedPrincipal)
//            return (JwtVerificationFilter.AuthenticatedPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        else return null;
//    }
//    public static boolean verifyIsMineBoolean(long memberId){
//        JwtVerificationFilter.AuthenticatedPrincipal loggedInMember = findLoggedInMember();
//        try{
//            return loggedInMember.getMemberId() == memberId;
//        }catch (NullPointerException e){
//            return false;
//        }
//    }
//
//    public static void verifyIsMineException(long memberId){
//        if(!verifyIsMineBoolean(memberId))
//            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_AUTHORIZED);
//    }
}
