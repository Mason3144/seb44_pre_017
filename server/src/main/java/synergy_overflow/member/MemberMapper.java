package synergy_overflow.member;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "Spring")
@Component
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDTO.Post request);


    MemberDTO.GetMemberResponse MemberToGetMemberResponse (Member member);

    Member memberPatchDtoToMember(MemberDTO.Patch request);

//    role 전달
//    Member toEntituy(MemberDTO.Post request,Member.Status);

}
