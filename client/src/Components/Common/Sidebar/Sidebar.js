import * as S from './Sidebar.styled';
import { ReactComponent as Earth } from '../../../icons/earth.svg';

function Sidebar() {
  return (
    <S.SidebarContainer>
      <S.Home>Home</S.Home>
      <S.Public>PUBLIC</S.Public>
      <S.PublicContainer>
        <S.Icon>
          <Earth />
        </S.Icon>
        <S.Groups>
          <S.Questions>Questions</S.Questions>
          <S.Tags>Tags</S.Tags>
          <S.Users>Users</S.Users>
          <S.Companies>Companies</S.Companies>
        </S.Groups>
      </S.PublicContainer>
    </S.SidebarContainer>
  );
}
export default Sidebar;
