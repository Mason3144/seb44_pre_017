//조건부 라우팅, 조건부 UI 는 로그인 상태가 적용된 이후에 해제해야 합니다.
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../redux/sidebarSlice';
import * as S from './Header.styled';
import { ReactComponent as Hamburger } from '../../../icons/hamburger.svg';
import { ReactComponent as Search } from '../../../icons/search.svg';
// import { ReactComponent as Profile } from '../../../icons/profile.svg';
import logo from '../../../icons/logo.png';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const goHome = () => {
    //   if (로그인상태) {
    //     navigate('/questions');
    //   } else {
    navigate('/home');
    //   }
  };

  // const goProfile = () => {
  //   navigate('/members/{member-id}');
  // };

  // const goLogin = () => {
  //   navigate('/');
  // };

  // const goSignup = () => {
  //   navigate('/members');
  // };

  return (
    <>
      <S.HeaderContainer>
        <S.MenuBtn>
          <Hamburger onClick={handleSidebarToggle} />
        </S.MenuBtn>
        <S.TitleContainer onClick={goHome}>
          <img src={logo} alt="logo" />
          <S.Title>
            <S.Synergy>synergy</S.Synergy>
            <S.Overflow>overflow</S.Overflow>
          </S.Title>
        </S.TitleContainer>
        <S.Products>Products</S.Products>
        <S.SearchContainer>
          <S.SearchIcon>
            <Search />
          </S.SearchIcon>
          <S.Searchbar type="text" placeholder="Search..." />
        </S.SearchContainer>
        {/* {로그인상태?(
                  <S.LoginBtn onClick={goLogin}>Log in</S.LoginBtn>
                  <S.SignupBtn onClick={goSignup}>Sign up</S.SignupBtn>
        ):(         
        <S.ImgContainer onClick={goProfile}>
          <Profile />
        </S.ImgContainer>
        <S.LogoutBtn>Log out</S.LogoutBtn>
   )}  */}
      </S.HeaderContainer>
    </>
  );
}

export default Header;
