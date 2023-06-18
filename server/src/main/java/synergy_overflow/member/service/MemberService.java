package synergy_overflow.member.service;

import org.springframework.stereotype.Service;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 회원 가입
    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        // 여기서 password encode ?? 와 role ??
        return memberRepository.save(member);
    }

    // 로그인
//    public Member login(Member member){
//    }

    // 회원 수정
    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberid());

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        //  비밀번호 변경 저장하고 PasswordEncode 추가 해야함

        return memberRepository.save(findMember);
    }

    // 회원 조회
    public Member findMember(long memberId){

        return findVerifiedMember(memberId);
    }

    // 회원 삭제
    public void deleteMember(long memberId){
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
