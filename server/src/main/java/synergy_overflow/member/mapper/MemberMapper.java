package synergy_overflow.member.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;

@Mapper(componentModel = "Spring")
@Component
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post request);


    MemberDto.Response MemberToGetMemberResponse (Member member);

    Member memberPatchDtoToMember(MemberDto.Patch request);

//    role 전달
//    Member toEntituy(MemberDTO.Post request,Member.Status);

}
