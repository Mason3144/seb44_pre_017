package synergy_overflow.answer.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import synergy_overflow.answer.dto.AnswerDto.patchDto;
import synergy_overflow.answer.dto.AnswerDto.postDto;
import synergy_overflow.answer.dto.AnswerDto.responseDto;
import synergy_overflow.answer.entity.Answer;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-21T14:10:12+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer AnswerPostToAnswer(postDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        return answer;
    }

    @Override
    public Answer AnswerPatchToAnswer(patchDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( requestBody.getAnswerId() );

        return answer;
    }

    @Override
    public responseDto AnswerToResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        responseDto responseDto = new responseDto();

        if ( answer.getAnswerId() != null ) {
            responseDto.setAnswerId( answer.getAnswerId() );
        }
        responseDto.setAdopted( answer.isAdopted() );
        responseDto.setCreatedAt( answer.getCreatedAt() );

        return responseDto;
    }
}
