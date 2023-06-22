package synergy_overflow.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.comment.mapper.CommentMapper;
import synergy_overflow.comment.service.CommentService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping("/questions/{question-id}/answers/{answer-id}/comments")
    public ResponseEntity postComment(
            @RequestBody @Valid CommentDto.Post requestBody,
            @PathVariable("question-id") @Positive long questionId,
            @PathVariable("answer-id") @Positive long answerId) {

        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createComment(comment);

        CommentDto.Response response = mapper.commentToCommentResponse(createdComment);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }
}
