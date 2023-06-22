package synergy_overflow.comment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.comment.entity.Comment;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post requestBody);

    CommentDto.Response commentToCommentResponse(Comment comment);
}
