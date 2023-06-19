import Login from '../../Components/LoginSignup/Login.jsx';
import * as S from '../LoginSignup/LoginPage.styled.js';

// header, footer 컴포넌트 완료 시, 추가 예정
const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="header"></div>
      <S.LoginPageWrapper>
        <Login />
      </S.LoginPageWrapper>
      <div className="footer"></div>
    </div>
  );
};

export default LoginPage;
