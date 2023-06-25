/* eslint-disable import/named */
/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from './Login.styled';
import { login } from '../../redux/userSlice';
import { responseUserInfo } from '../../redux/userInfoSlice';
import { setLoginState } from '../../redux/loginSlice';
axios.defaults.withCredentials = true;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resUserInfo = useSelector((state) => state.responseUserInfo.value);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const regExpEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExpPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

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
        dispatch(login({ email: loginInfo.email }));
        const url = `${process.env.REACT_APP_API_URL}/auth/login`;
        const res = await axios.post(url, {
          username: loginInfo.email,
          password: loginInfo.password
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          dispatch(setLoginState(true));
          alert('로그인에 성공하였습니다.');
          navigate('/questions');

          const updatedUserInfo = {
            ...resUserInfo,
            memberId: res.data.memberId,
            nickname: res.data.nickname,
          };
          dispatch(responseUserInfo(updatedUserInfo));
          dispatch(login(loginInfo));
          localStorage.setItem('memberId', updatedUserInfo.memberId);
          localStorage.setItem('nickname', updatedUserInfo.nickname);
          localStorage.setItem('email', loginInfo.email);

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

  const LoginRequestHandlerGoogle = () => {
    window.location.href =
      `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
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

export const KeepLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('Authorization');
    const nickname = localStorage.getItem('nickname');
    const memberId = localStorage.getItem('memberId');
    const email = localStorage.getItem('email');
    if (accessToken !== null) {
      dispatch(setLoginState(true));
      dispatch(responseUserInfo({ memberId, nickname }));
      dispatch(login({ email }));
      navigate('/questions');
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


export const GoogleLoginToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let accessToken = new URL(location.href).searchParams.get('access_token');
  let refreshToken = new URL(location.href).searchParams.get('refresh_token');
  let nickname = new URL(location.href).searchParams.get('nickname');
  let memberId = new URL(location.href).searchParams.get('memberId');

  localStorage.setItem('Authorization', accessToken);
  localStorage.setItem('refresh', refreshToken);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('memberId', memberId);

  dispatch(responseUserInfo({ memberId, nickname }));
  dispatch(setLoginState(true));

  useEffect(() => navigate('/questions'));
  return <div>Loading..</div>;
};
