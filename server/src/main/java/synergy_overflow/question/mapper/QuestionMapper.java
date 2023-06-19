package synergy_overflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.WriterDto;
import synergy_overflow.question.temporaries.temporaryEntities.AnswerEntity;
import synergy_overflow.question.temporaries.temporaryEntities.MemberEntity;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    Question questionDtoPostToQuestion(QuestionDto.Post questionDtoPost);
    Question questionDtoPatchToQuestion(QuestionDto.Patch questionDtoPost);
    QuestionDto.Response questionToQuestionDtoResponse(Question question);
    WriterDto.Response memberToWriterDtoResponse(MemberEntity member);
    int answersToAnswerNumber(List<AnswerEntity> answers);
    MultiResponseDto.MultiQuestionsResponse questionToMultiResponseDto(Question question);
    List<MultiResponseDto.MultiQuestionsResponse> questionsToMultiResponseDtos(List<Question> questions);
}
