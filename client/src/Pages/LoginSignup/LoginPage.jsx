import Login from '../../Components/LoginSignup/Login.jsx';
import * as S from '../LoginSignup/LoginPage.styled.js';

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <S.LoginPageWrapper>
        <Login />
      </S.LoginPageWrapper>
    </div>
  );
};

export default LoginPage;
