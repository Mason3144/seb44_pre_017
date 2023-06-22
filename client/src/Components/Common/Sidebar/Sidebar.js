import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from './Sidebar.styled';
import { ReactComponent as Earth } from '../../../icons/earth.svg';

//로그인 상태에 따라 home 클릭 시 페이지 이동을 달리하기 때문에 로그인 상태를 props로 전달받아야 합니다.  ex{isLoggedIn}
function Sidebar() {
  const navigate = useNavigate();
  const open = useSelector((state) => state.sidebar.open);
  const [active, setActive] = useState('Home');
  const handleButtonClick = (name) => {
    setActive(name);
  };
  const goHome = () => {
    handleButtonClick('Home');
    //   if (로그인상태) {
    //     navigate('/questions');
    //   } else {
    navigate('/home');
    //   }
  };
  const goQuestions = () => {
    handleButtonClick('Questions');
    navigate('/questions/board');
  };
  return (
    <S.SidebarContainer open={open}>
      <S.Home active={active === 'Home' ? 'Home' : ''} onClick={goHome}>
        Home
      </S.Home>
      <S.Public>PUBLIC</S.Public>
      <S.Groups>
        <S.Questions
          active={active === 'Questions' ? 'Questions' : ''}
          onClick={goQuestions}
        >
          <Earth />
          Questions
        </S.Questions>
        <S.Tags>
          <S.Empty></S.Empty>
          Tags
        </S.Tags>
        <S.Users>
          <S.Empty></S.Empty>
          Users
        </S.Users>
        <S.Companies>
          <S.Empty></S.Empty>
          Companies
        </S.Companies>
      </S.Groups>
    </S.SidebarContainer>
  );
}
export default Sidebar;
