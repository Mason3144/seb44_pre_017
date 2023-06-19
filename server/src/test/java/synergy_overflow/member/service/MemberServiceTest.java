package synergy_overflow.member.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;



    //verifyExistsEmail() 예외 테스트
    @Test
    void createMember() {
//        given
        Member member = new Member();
        member.setEmail("hgd@gmail.com");
        member.setNickname("홍길동");

        given(memberRepository.findByEmail(Mockito.anyString())).willReturn(Optional.of(member));

        //when,then
        assertThrows(BusinessLogicException.class,() -> memberService.createMember(member));

    }

    // findVerifiedMember 예외 테스트
    @Test
    void findMember() {

        assertThrows(BusinessLogicException.class, () -> memberService.findMember(1));
    }



}