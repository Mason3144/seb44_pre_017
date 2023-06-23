import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from './Sidebar.styled';
import { ReactComponent as Earth } from '../../../icons/earth.svg';

function Sidebar() {
  const navigate = useNavigate();
  const open = useSelector((state) => state.sidebar.open);
  const login = useSelector((state) => state.login);

  const [active, setActive] = useState('Home');
  const handleButtonClick = (name) => {
    setActive(name);
  };

  const goHome = () => {
    handleButtonClick('Home');
    if (login === true) {
      navigate('/questions');
    } else {
      navigate('/home');
    }
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
