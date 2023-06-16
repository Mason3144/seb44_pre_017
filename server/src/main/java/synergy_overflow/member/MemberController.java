package synergy_overflow.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    @GetMapping("/auth/login")
    public String loginForm(){
        return "login";
    }
    @GetMapping("/members")
    public String createAccountForm(){
        return "sign up";
    }
}
