package synergy_overflow.member.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import synergy_overflow.member.dto.MemberDTO;
import synergy_overflow.member.entity.Member;

@Mapper(componentModel = "Spring")
@Component
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDTO.Post request);


    MemberDTO.GetMemberResponse MemberToGetMemberResponse (Member member);

    Member memberPatchDtoToMember(MemberDTO.Patch request);

//    role 전달
//    Member toEntituy(MemberDTO.Post request,Member.Status);

}
