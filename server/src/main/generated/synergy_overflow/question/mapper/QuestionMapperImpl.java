package synergy_overflow.question.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.CommentsDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-21T16:11:54+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost) {
        if ( questionDtoPost == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( questionDtoPost.getTitle() );
        question.setBody( questionDtoPost.getBody() );

        return question;
    }

    @Override
    public Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost) {
        if ( questionDtoPost == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( questionDtoPost.getQuestionId() );
        question.setTitle( questionDtoPost.getTitle() );
        question.setBody( questionDtoPost.getBody() );

        return question;
    }

    @Override
    public QuestionDto.Response questionToQuestionDtoResponseWithoutId(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.Response.ResponseBuilder response = QuestionDto.Response.builder();

        response.questionId( question.getQuestionId() );
        response.title( question.getTitle() );
        response.body( question.getBody() );
        response.createdAt( question.getCreatedAt() );
        response.writer( memberToWriterDtoResponse( question.getWriter() ) );
        response.answers( answerEntityListToResponseList( question.getAnswers() ) );

        return response.build();
    }

    @Override
    public List<MultiResponseDto.MultiQuestionsResponse> questionsToMultiResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<MultiResponseDto.MultiQuestionsResponse> list = new ArrayList<MultiResponseDto.MultiQuestionsResponse>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToMultiResponseDto( question ) );
        }

        return list;
    }

    @Override
    public MemberDto.Response memberToWriterDtoResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String nickname = null;

        if ( member.getMemberId() != null ) {
            memberId = member.getMemberId();
        }
        nickname = member.getNickname();

        MemberDto.Response response = new MemberDto.Response( memberId, nickname );

        return response;
    }

    @Override
    public AnswerDto.Response answerToAnswerDtoResponse(AnswerEntity answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerDto.Response.ResponseBuilder response = AnswerDto.Response.builder();

        response.answerId( answer.getAnswerId() );
        response.answerBody( answer.getAnswerBody() );
        response.createdAt( answer.getCreatedAt() );
        response.adopted( answer.isAdopted() );
        response.writer( memberToWriterDtoResponse( answer.getWriter() ) );
        response.comments( commentEntityListToResponseList( answer.getComments() ) );

        return response.build();
    }

    @Override
    public CommentsDto.Response commentToCommentsDtoResponse(CommentEntity comment) {
        if ( comment == null ) {
            return null;
        }

        CommentsDto.Response.ResponseBuilder response = CommentsDto.Response.builder();

        response.commentId( comment.getCommentId() );
        response.commentBody( comment.getCommentBody() );
        response.createdAt( comment.getCreatedAt() );
        response.writer( memberToWriterDtoResponse( comment.getWriter() ) );

        return response.build();
    }

    protected List<AnswerDto.Response> answerEntityListToResponseList(List<AnswerEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerDto.Response> list1 = new ArrayList<AnswerDto.Response>( list.size() );
        for ( AnswerEntity answerEntity : list ) {
            list1.add( answerToAnswerDtoResponse( answerEntity ) );
        }

        return list1;
    }

    protected List<CommentsDto.Response> commentEntityListToResponseList(List<CommentEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<CommentsDto.Response> list1 = new ArrayList<CommentsDto.Response>( list.size() );
        for ( CommentEntity commentEntity : list ) {
            list1.add( commentToCommentsDtoResponse( commentEntity ) );
        }

        return list1;
    }
}
