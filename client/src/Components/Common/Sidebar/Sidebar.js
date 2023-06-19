import { useState } from 'react';
// import { Link } from 'react-router-dom';
import * as S from './Sidebar.styled';
import { ReactComponent as Earth } from '../../../icons/earth.svg';

//로그인 상태에 따라 home 클릭 시 페이지 이동을 달리하기 때문에 로그인 상태를 props로 전달받아야 합니다.  ex{isLoggedIn}

function Sidebar() {
  const [active, setActive] = useState('');
  const handleButtonClick = (name) => {
    setActive(name);
  };
  return (
    <S.SidebarContainer>
      {/*로그인 상태 props를 전달받고
      페이지가 생성되었을 때,
      아래의 S.Home 컴포넌트를 삭제한 뒤 주석을 제거합니다.*/}
      <S.Home
        active={active === 'Home'}
        onClick={() => handleButtonClick('Home')}
      >
        Home
      </S.Home>
      {/* {isLoggedIn ? (
        <Link to="/home">
          <S.Home
            active={active === 'Home'}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </S.Home>
        </Link>
      ) : (
        <Link to="/">
          <S.Home
            active={active === 'Home'}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </S.Home>
        </Link>
      )} */}
      <S.Public>PUBLIC</S.Public>
      <S.Groups>
        {/* <Link to="/questions/?page=1&size=20"> */}
        <S.Questions
          active={active === 'Questions'}
          onClick={() => handleButtonClick('Questions')}
        >
          <Earth />
          Questions
        </S.Questions>
        {/* </Link> */}
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
