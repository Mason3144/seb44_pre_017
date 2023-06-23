package synergy_overflow.member.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import synergy_overflow.auth.utils.MemberAuthorityUtils;
import synergy_overflow.exception.businessLogicException.BusinessLogicException;
import synergy_overflow.exception.businessLogicException.ExceptionCode;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.repository.MemberRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         MemberAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    // 회원 등록
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        // Password 단뱡향 암호화
        String encryptedPW = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPW);

        // DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 회원 수정
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        LoggedInMemberUtils.verifyMine(findMember.getEmail());

        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);

        // 비밀번호 변경 시, 인코딩해서 저장
//        Optional<String> password =
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> {
                    String encryptedPW = passwordEncoder.encode(password);
                    findMember.setPassword(encryptedPW);
                });

        return memberRepository.save(findMember);
    }

    // 회원 조회
    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    // 회원 삭제
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        LoggedInMemberUtils.verifyMine(findMember.getEmail());
        memberRepository.delete(findMember);
    }

    // 이미 존재하는 회원인지 검증
    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);

        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public boolean isExistMember(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    // 이미 존재하는 회원의 이메일로 멤버 객체 리턴
    public Member findMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.get();
    }

    // 이미 등록된 이메일 주소인지 검증
    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    // 회원 권한 조회
    public List<GrantedAuthority> findMemberAuthorities(Member member) {
        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return authorities;
    }
}