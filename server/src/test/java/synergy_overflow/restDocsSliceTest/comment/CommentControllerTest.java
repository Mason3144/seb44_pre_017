package synergy_overflow.restDocsSliceTest.comment;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import synergy_overflow.comment.controller.CommentController;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.comment.mapper.CommentMapper;
import synergy_overflow.comment.service.CommentService;
import synergy_overflow.member.entity.Member;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willReturn;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;

// TODO 수정 필요
@WebMvcTest(CommentController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    public void postCommentTest() {
        // Given
        long commentId = 1L;
        long questionId = 1L;
        long answerId = 2L;

        CommentDto.Post post =
                new CommentDto.Post(commentId,"This is the comment below the answer");
        String content = gson.toJson(post);

        Member writer = new Member();
        writer.setMemberId(1L);

        // Answer answer = new Answer();
        // answer.setAnswerId


        given(mapper.commentPostDtoToComment(Mockito.any(CommentDto.Post.class)))
                .willReturn(new Comment());

        // given(commentService.createComment(Mockito.any(Comment.class)))
        //       .willReturn(mockResultComment);



        // when
      /*  ResultActions actions =
                mockMvc.perform(
                        post("/questions/{question-id}/answers/{answer-id}/comments", questionId, answerId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions.andExpect()*/
    }
}
