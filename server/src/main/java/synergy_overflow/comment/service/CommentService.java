package synergy_overflow.comment.service;

import org.springframework.stereotype.Service;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.comment.repository.CommentRepository;
import synergy_overflow.helper.loggedInChecker.LoggedInMemberUtils;
import synergy_overflow.member.entity.Member;
import synergy_overflow.member.service.MemberService;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository,
                          MemberService memberService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
    }

    public Comment createComment(Comment comment, long answerId) {
        // 인증된 회원인지 확인
        String authenticatedMemberEmail = LoggedInMemberUtils.findLoggedInMember();
        Member member = memberService.findMemberByEmail(authenticatedMemberEmail);

        // answer 추가
        Answer answer = new Answer();
        answer.setAnswerId(answerId);

        // 회원과 답변에 댓글 추가
        member.addComments(comment);
        answer.setComments(comment);

        return commentRepository.save(comment);
    }
}
