package synergy_overflow.member.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import synergy_overflow.member.entity.Member;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("member save test")
    public void saveMemberTest() {
        //given
        Member member = new Member();
        member.setEmail("hgd@gmail.com");
        member.setPassword("q1w2e3r4!");
        member.setNickname("홍길동");

        //when
        Member savedMember = memberRepository.save(member);

        //then
        assertNotNull(savedMember);
        assertTrue(member.getEmail().equals(savedMember.getEmail()));
        assertTrue(member.getPassword().equals(savedMember.getPassword()));
        assertTrue(member.getNickname().equals(savedMember.getNickname()));
    }

    @Test
    @DisplayName("이메일로 회원 찾기 test")
    public void findByEmailTest() {
        //given
        Member member = new Member();
        member.setEmail("hgd@gmail.com");
        member.setPassword("q1w2e3r4!");
        member.setNickname("홍길동");

        //when
        memberRepository.save(member);
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());

        //then
        assertTrue(findMember.isPresent());
        assertTrue(findMember.get().getEmail().equals(member.getEmail()));
    }
}