package synergy_overflow.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.mapper.MemberMapper;
import synergy_overflow.member.service.MemberService;
import synergy_overflow.member.entity.Member;

import javax.validation.Valid;

@RestController
@RequestMapping
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;


    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 로그인
    @PostMapping("/auth/login")
    public String loginForm(){

        return "login";
    }

    // 회원 가입
    @PostMapping("/members")
    public ResponseEntity createAccountForm(@RequestBody @Valid MemberDto.Post memberDTO){
        Member response = memberService.createMember(mapper.memberPostDtoToMember(memberDTO));
        return new ResponseEntity <>(response,HttpStatus.CREATED);
    }

    // 회원 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity findMember(@PathVariable("member-id") long memberid){
        Member response = memberService.findMember(memberid);

        return new ResponseEntity <>(mapper.MemberToGetMemberResponse(response) ,HttpStatus.OK);
    }

    // 회원 수정
    @PatchMapping("/members/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberid,
                                      @RequestBody @Valid MemberDto.Patch patchDto){

        patchDto.setMemberId(memberid);
        Member response =memberService.updateMember(mapper.memberPatchDtoToMember(patchDto));

        return new ResponseEntity<>(mapper.MemberToGetMemberResponse(response),HttpStatus.OK);
    }

    // 회원 삭제
    @DeleteMapping("/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberid){
        memberService.deleteMember(memberid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        // 회원 정보만 삭제하면 답변 댓글 질문 데이터도 같이 삭제 ??
    }

}

