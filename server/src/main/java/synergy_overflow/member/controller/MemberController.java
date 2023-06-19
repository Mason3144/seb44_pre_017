package synergy_overflow.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.mapper.MemberMapper;
import synergy_overflow.member.service.MemberService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping(value = "/members")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 회원 등록
    @PostMapping
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody
    ) {
        requestBody.setMemberId(memberId);

        Member member = mapper.memberPatchToMember(requestBody);
        Member updatedMember = memberService.updateMember(member);

        MemberDto.Response response = mapper.memberToMemberResponse(updatedMember);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {

        Member member = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 회원 삭제
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

