package synergy_overflow.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post requestBody);

    default CommentDto.Response commentToCommentResponse(Comment comment){
        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .answerId(comment.getAnswer().getAnswerId())
                .commentBody(comment.getCommentBody())
                .createdAt(comment.getCreatedAt())
                .writer(new MemberDto.Response(comment.getWriter().getMemberId(), comment.getWriter().getNickname()))
                .build();
    }
}
