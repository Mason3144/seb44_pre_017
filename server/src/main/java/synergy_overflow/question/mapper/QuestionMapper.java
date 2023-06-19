package synergy_overflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.AnswerDto;
import synergy_overflow.question.temporaries.temporaryDtos.CommentsDto;
import synergy_overflow.question.temporaries.temporaryDtos.WriterDto;
import synergy_overflow.question.temporaries.temporaryEntities.AnswerEntity;
import synergy_overflow.question.temporaries.temporaryEntities.CommentEntity;
import synergy_overflow.question.temporaries.temporaryEntities.MemberEntity;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost);
    Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost);
    QuestionDto.Response questionToQuestionDtoResponse(Question question);
    int answersToAnswerNumber(List<AnswerEntity> answers);
    MultiResponseDto.MultiQuestionsResponse questionToMultiResponseDto(Question question);
    List<MultiResponseDto.MultiQuestionsResponse> questionsToMultiResponseDtos(List<Question> questions);

    // 임시 dto 및 entity를 위한 임시 맵핑
    WriterDto.Response memberToWriterDtoResponse(MemberEntity member);
    AnswerDto.Response answerToAnswerDtoResponse(AnswerEntity answer);
    CommentsDto.Response commentToCommentsDtoResponse(CommentEntity comment);

}
