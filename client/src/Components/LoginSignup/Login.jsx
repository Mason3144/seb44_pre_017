/* eslint-disable import/named */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
import * as S from './Login.styled';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/user';
import { setLoginState } from '../../redux/login';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 사용
  // input창에 입력되는 로그인 text 저장
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  // 로그인 text 값 저장
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 유효성 검사
  const regExpEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExpPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

  // HTTP 요청
  // 1. 이메일 로그인
  // 1-1. 유효성 검사
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
        // 1-2. 유저 정보 저장
        dispatch(
          login({ username: loginInfo.username, password: loginInfo.password })
        );

        const url =
          'http://ec2-54-148-132-64.us-west-2.compute.amazonaws.com:8080/auth/login';
        const res = await axios.post(url, loginInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // 1-3. 로그인 성공 시, 로그인 상태 변경
        if (res.status === 200) {
          dispatch(setLoginState(true));
          alert('로그인에 성공하였습니다.');
          navigate('/questions');
          // 1-4. 엑세스 토큰, 리프레시 토큰 받고, 브라우저 쿠키에 저장
          if (res.data.ACCESS_TOKEN) {
            document.cookie = `access_token=${res.data.ACCESS_TOKEN}; path=/`;
            document.cookie = `refresh_token=${res.data.REFRESH_TOKEN}; path=/`;
          }
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
  // access token 핸들링 하는 코드 작성 -> access token 발급 이후의 코드: access token을 response header로 통신.
  // 사용자가 기능을 사용할 때, 모든 HTTP 요청의 request header에 access token을 추가해서 전달해야 한다.

  // 2. 구글 로그인
  const LoginRequestHandlerGoogle = () => {
    window.location.href = 'http://ec2-54-148-132-64.us-west-2.compute.amazonaws.com:8080/oauth2/authorization/google';
  };
  // 구글 로그인 페이지로 이동 -> 사용자 구글 로그인 -> 로그인 성공 시, 메인 페이지로 이동
  // 질문 1: 로그인 상태는 어느 시점에서 변경해야 할까?
  // 다시 메인페이지로 리다이렉트 되었을 때, 로그인 상태를 변경해야 할까?
  //   1-1: 로그인 상태 저장
  //   dispatch(setLoginState(true));
  // 질문 2: 토큰 저장 및 브라우저 쿠키 저장은 어느 시점에 해야 할까? 전체 코드 중 어디 코드에 작성되어야 하는가? 
  //   1-2. 엑세스 토큰, 리프레시 토큰 받고, 브라우저 쿠키에 저장
  //   if (res.data.ACCESS_TOKEN)
  //   document.cookie = `access_token=${res.data.ACCESS_TOKEN}; path=/`;
  //   document.cookie = `refresh_token=${res.data.REFRESH_TOKEN}; path=/`;

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
