/* eslint-disable import/named */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
import * as S from './Login.styled';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/user'
import { setLoginState } from '../../redux/login';
// import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  // const navigate = useNavigate(); // useNavigate 사용

  const regExpEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExpPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const LoginRequestHandler = async () => {
    if (!loginInfo.username || !loginInfo.password) {
      return alert('아이디와 비밀번호를 입력하세요.');
    } else if (loginInfo.username.match(regExpEmail) === null) {
      return alert('올바른 Email 형식이 아닙니다.');
    } else if (loginInfo.password.match(regExpPassword) === null) {
      return alert(
        '패스워드는 영문, 숫자, 특수기호를 포함하여 6자 이상이어야 합니다.'
      );
    } else {
      try {
        dispatch(
          login({ username: loginInfo.username, password: loginInfo.password })
        );
        const url =
          'http://ec2-54-148-132-64.us-west-2.compute.amazonaws.com:8080/auth/login';
        const res = await axios.post(url, loginInfo, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(res);
        if (res.status === 200) {
          dispatch(setLoginState(true));
              alert('로그인에 성공하였습니다.');
              // navigate('/');     
        } else if (res.status === 409) {
          alert('이미 가입된 아이디입니다.')
        }
        // else if (res.status === 404) {
          // navigate('/notfound')
        else {
          alert('로그인에 실패하였습니다.');
        }
      } catch (err) {
        console.error(err);
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    }
  };

  const LoginRequestHandlerGoogle = () => {
    axios
      .get(
        'http://ec2-54-148-132-64.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/google'
      )
      .then((res) => {
        console.log(res);
        // access token 핸들링 하는 코드 작성 -> access token 발급 이후 코드 작성
        // access token을 response header로만 통신한다.
        // access token을 사용자가 기능을 사용할 때, 모든 HTTP 요청의 request header에 넣어줘야 한다.
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <S.LoginWrapper>
      <S.StyledStackoverflowLogo />
      <S.GoogleLoginContainer onClick={LoginRequestHandlerGoogle}>
        <S.StyledGoogleLogo />
        <S.StyledGoogleLoginText>
          <span> Log in with Google</span>
        </S.StyledGoogleLoginText>
      </S.GoogleLoginContainer>
      <S.EmailLoginContainer>
        <div className="EmailTextBox">
          <strong>Email</strong>
          <S.LoginInputBox
            type="text"
            onChange={handleInputValue('username')}
          />
        </div>
        <div className="PasswordTextBox">
          <strong>Password</strong>
          <S.LoginInputBox
            type="password"
            onChange={handleInputValue('password')}
          />
        </div>
        <S.LoginButton onClick={LoginRequestHandler}>
          <span>Log in</span>
        </S.LoginButton>
      </S.EmailLoginContainer>
      <S.BottomTextBox>
        <S.DontHaveAccount>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
          <S.SignupLink href="/members"> Sign up</S.SignupLink>
        </S.DontHaveAccount>
        <S.AreyouanEmployer>
          Are you an employer?
          <S.SignuponTalentLink> Sign up on Talent</S.SignuponTalentLink>
        </S.AreyouanEmployer>
      </S.BottomTextBox>
    </S.LoginWrapper>
  );
};

export default Login;

