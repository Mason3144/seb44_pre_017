package synergy_overflow.answer.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import synergy_overflow.answer.dto.AnswerDto;
import synergy_overflow.answer.entity.Answer;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-21T16:11:58+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer AnswerPostToAnswer(AnswerDto.postDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();
        answer.setAnswerBody(requestBody.getBody);

        return answer;
    }

    @Override
    public Answer AnswerPatchToAnswer(AnswerDto.patchDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( requestBody.getAnswerId() );
        answer.setAnswerBody(requestBody.getAnswerBody);
        return answer;
    }

    @Override
    public AnswerDto.responseDto AnswerToResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerDto.responseDto responseDto = new AnswerDto.responseDto();

        if ( answer.getAnswerId() != null ) {
            responseDto.setAnswerId( answer.getAnswerId() );
        }
        responseDto.setAnswerBody(answer.getAnswerBody);
        responseDto.setAdopted( answer.isAdopted() );
        responseDto.setCreatedAt( answer.getCreatedAt() );
        responseDto.setWriter( memberToResponse( answer.getWriter() ) );

        return responseDto;
    }

    protected MemberDto.Response memberToResponse(Member member) {
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
}
