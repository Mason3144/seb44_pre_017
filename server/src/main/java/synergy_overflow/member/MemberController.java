package synergy_overflow.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
public class MemberController {
    // 로그인
    @PostMapping("/auth/login")
    public String loginForm(){

        return "login";
    }

    // 회원 가입
    @PostMapping("/members")
    public ResponseEntity createAccountForm(@RequestBody @Valid MemberDTO.Post memberDTO){

        return new ResponseEntity <MemberDTO.Post>(memberDTO,HttpStatus.CREATED);
    }

    // 회원 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity findMember(@PathVariable("member-id") long member_id){
        return new ResponseEntity <>( HttpStatus.OK);
    }

    // 회원 수정
    @PatchMapping("/members/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long member_id,
                                      @RequestBody @Valid MemberDTO.Patch patchDto){


        return new ResponseEntity<>(patchDto,HttpStatus.OK);
    }

    // 회원 삭제
    @DeleteMapping("/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long member_id){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
