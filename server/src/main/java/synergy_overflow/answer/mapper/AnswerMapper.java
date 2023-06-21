package synergy_overflow.answer.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;

@Mapper(componentModel = "spring")
@Component
public interface AnswerMapper {

    Answer AnswerPostToAnswer(AnswerDto.postDto requestBody);

    Answer AnswerPatchToAnswer(AnswerDto.patchDto requestBody);

    AnswerDto.responseDto AnswerToResponse(Answer answer);
}
