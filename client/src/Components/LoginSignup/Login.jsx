/* eslint-disable import/named */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
import * as S from './Login.styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';
import { responseUserInfo } from '../../redux/userInfoSlice';
import { setLoginState } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resUserInfo = useSelector((state) => state.responseUserInfo.value);

  // input창에 입력되는 로그인 text 저장
  const [loginInfo, setLoginInfo] = useState({
    email: '',
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
    if (!loginInfo.email || !loginInfo.password) {
      return alert('아이디와 비밀번호를 입력하세요.');
    } else if (loginInfo.email.match(regExpEmail) === null) {
      return alert('올바른 Email 형식이 아닙니다.');
    } else if (loginInfo.password.match(regExpPassword) === null) {
      return alert(
        '패스워드는 영문, 숫자, 특수기호를 포함하여 6자 이상이어야 합니다.'
      );
    } else {
      try {
        // 1-2. 유저 정보 저장
        dispatch(login({ email: loginInfo.email }));
        const url =
          'http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/auth/login';
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

          // 1-4. 리덕스 스토어 객체는 읽기 전용 객체이기 때문에
          // 깊은 복사 후 updatedUserInfo 변수에 할당
          const updatedUserInfo = {
            ...resUserInfo,
            memberId: res.data.memberId,
            nickname: res.data.nickname,
          };

          // 1-5. updateUserInfo 변수, loginInfo 변수를 리덕스 스토어 및 로컬 스토리지에 저장
          dispatch(responseUserInfo(updatedUserInfo));
          dispatch(login(loginInfo));
          localStorage.setItem('memberId', updatedUserInfo.memberId);
          localStorage.setItem('nickname', updatedUserInfo.nickname);
          localStorage.setItem('email', loginInfo.email);

          // 1-6. 엑세스 토큰, 리프레시 토큰 받고, 브라우저 로컬스토리지에 저장
          const ACCESS_TOKEN = res.headers.get('Authorization');
          const REFRESH_TOKEN = res.headers.get('refresh');
          localStorage.setItem('Authorization', ACCESS_TOKEN);
          localStorage.setItem('refresh', REFRESH_TOKEN);
        } else {
          alert('로그인에 실패하였습니다.');
        }
      } catch (err) {
        console.error(err);
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    }
  };

  // 2. 구글 로그인 페이지 이동
  const LoginRequestHandlerGoogle = () => {
    window.location.href =
      'http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google/';
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
          <div></div>
          <S.LoginInputBox type="text" onChange={handleInputValue('email')} />
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

// 2-1. 서버에서 구글 로그인 성공 시, 클라이언트로 리다이렉트 되는 URI 에서, 엑세스/리프레시 토큰 받기
// 클라이언트로 리다이렉트 되는 /oauth2/authorization/google/success/
// App.js에서 GoogleLoginToken 컴포넌트를 위 URI로 경로 설정
export const GoogleLoginToken = () => {
  const navigate = useNavigate();
  window.location.href =
    'http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google/success';

  let accessToken = new URL(location.href).searchParams.get('access_token');
  let refreshToken = new URL(location.href).searchParams.get('refresh_token');

  localStorage.setItem('Authorization', accessToken);
  localStorage.setItem('refresh', refreshToken);

  useEffect(() => navigate('/questions'));
  return <div>Loading..</div>;
};

// 3. 토큰 만료 시, 자동 로그아웃 기능: 리프레시 토큰 만료 시, 자동 로그아웃(로그인 상태 false)
export const NoneRefreshTokenAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRefreshToken = () => {
      const refreshToken = localStorage.getItem('refresh');

      if (!refreshToken) {
        setLoginState(false);
        navigate('/login');
      } else {
        return;
      }
    };

    // 5분 마다 checkRefreshToken 함수를 실행합니다.
    const interval = setInterval(checkRefreshToken, 5 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return;
};

// 4. 로그인 유지 함수 (dispatch가 변경될 때마다 실행) / dispatch가 변경되는 경우: 로그인, 비밀번호 수정
// 4-1. 조건문(엑세스 토큰이 존재하면 실행)
// 4-1-1. 로그인 상태를 true 전환
// 4-1-2. 사용자 정보 로컬 스토리지에 저장
// 4-1-3. 로컬 스토리지 정보 -> 리덕스 스토어 저장
// 4-2. 엑세스 토큰 만료시 로그인 유지 종료
export const KeepLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('Authorization');
    const nickname = localStorage.getItem('nickname');
    const memberId = localStorage.getItem('memberId');
    const email = localStorage.getItem('email');
    if (accessToken) {
      dispatch(setLoginState(true));
      dispatch(responseUserInfo({ memberId, nickname }));
      dispatch(login({ email }));
    } else {
      dispatch(setLoginState(false));
      dispatch(responseUserInfo({ memberId: null, nickname: '' }));
      dispatch(login({ email: '' }));
      localStorage.removeItem('nickname');
      localStorage.removeItem('memberId');
      localStorage.removeItem('email');
    }
  }, [dispatch]);
};
