package synergy_overflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.comment.dto.CommentDto;
import synergy_overflow.comment.entity.Comment;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;



import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost);
    Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost);
    QuestionDto.Response questionToQuestionDtoResponseWithoutId(Question question);
    default QuestionDto.Response questionToQuestionDtoResponse(Question question){
        QuestionDto.Response response = questionToQuestionDtoResponseWithoutId(question);
        response.setQuestionId(question.getQuestionId());
        response.setCreatedAt(question.getCreatedAt());
        return response;
    };

    default int answersToAnswerNumber(List<Answer> answers){
        return answers.size();
    }
    default MultiResponseDto.MultiQuestionsResponse questionToMultiResponseDto(Question question){
        return MultiResponseDto.MultiQuestionsResponse.builder()
                .questionId(question.getQuestionId())
                .title(question.getTitle())
                .createdAt(question.getCreatedAt())
                .adopted(question.isAdopted())
                .views(question.getViews())
                .writer(memberToWriterDtoResponse(question.getWriter()))
                .answerNumber(answersToAnswerNumber(question.getAnswers()))
                .build();
    };
    List<MultiResponseDto.MultiQuestionsResponse> questionsToMultiResponseDtos(List<Question> questions);

    // 임시 dto 및 entity를 위한 임시 맵핑
    MemberDto.Response memberToWriterDtoResponse(Member member);
    AnswerDto.Response answerToAnswerDtoResponse(Answer answer);
    CommentDto.Response commentToCommentsDtoResponse(Comment comment);

}
