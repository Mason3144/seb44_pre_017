import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/sidebarSlice';
import { setLoginState } from '../../../redux/loginSlice';
import { login } from '../../../redux/userSlice';
import * as S from './Header.styled';
import { ReactComponent as Hamburger } from '../../../icons/hamburger.svg';
import { ReactComponent as Search } from '../../../icons/search.svg';
import { ReactComponent as Profile } from '../../../icons/profile.svg';
import logo from '../../../icons/logo.png';
import { responseUserInfo } from '../../../redux/userInfoSlice';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);
  const memberId = useSelector((state) => state.userInfo.value.memberId);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(setLoginState(false)); //로그인 상태 false
    localStorage.clear(); //토큰 삭제
    dispatch(responseUserInfo({ memberId: null, nickname: '' })); //사용자 정보 삭제
    dispatch(login({ email: '' })); //이메일 정보 삭제
    navigate('/'); //홈으로 리다이렉트
  };

  const goHome = () => {
    if (loginState === true) {
      navigate('/questions');
    } else {
      navigate('/');
    }
  };

  const goProfile = () => {
    navigate(`/members/${memberId}`);
  };

  const goLogin = () => {
    navigate('/login');
  };

  const goSignup = () => {
    navigate('/members');
  };

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
        {loginState === false ? (
          <>
            <S.LoginBtn onClick={goLogin}>Log in</S.LoginBtn>
            <S.SignupBtn onClick={goSignup}>Sign up</S.SignupBtn>
          </>
        ) : (
          <>
            <S.ImgContainer onClick={goProfile}>
              <Profile />
            </S.ImgContainer>
            <S.LogoutBtn onClick={handleLogout}>Log out</S.LogoutBtn>
          </>
        )}
      </S.HeaderContainer>
    </>
  );
}

export default Header;
