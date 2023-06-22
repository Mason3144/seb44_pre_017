package synergy_overflow.member.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-21T16:11:54+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setNickname( requestBody.getNickname() );

        return member;
    }

    @Override
    public Member memberPatchToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setPassword( requestBody.getPassword() );
        member.setNickname( requestBody.getNickname() );

        return member;
    }

    @Override
    public MemberDto.Response memberToMemberResponse(Member member) {
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
