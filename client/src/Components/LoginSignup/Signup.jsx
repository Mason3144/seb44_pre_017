/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
import * as S from './Signup.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginToken } from './Login.jsx';

axios.defaults.withCredentials = true;

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    nickname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const regExpEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const SignupRequestHandler = async () => {
    if (!signupInfo.email || !signupInfo.password) {
      return alert('아이디와 비밀번호를 입력하세요.');
    } else if (signupInfo.email.match(regExpEmail) === null) {
      return alert('올바른 Email 형식이 아닙니다.');
    } else if (signupInfo.password.match(regExpPassword) === null) {
      return alert(
        '패스워드는 영문, 숫자, 특수기호를 포함하여 6자 이상이어야 합니다.'
      );
    } else {
      try {
        const url =
          `${process.env.REACT_APP_API_URL}/members`;
        const res = await axios.post(url, signupInfo, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.status === 201) {
          alert('회원가입에 성공하였습니다.');
          navigate('/members/welcome');
        } else if (res.status === 409) {
          alert('이미 가입된 이메일입니다.');
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const LoginRequestHandlerGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google`;
  }
  
  GoogleLoginToken();
  
  return (
    <S.SignupWrapper>
      <S.StyledStackoverflowLogo />
      <S.GoogleLoginContainer onClick={LoginRequestHandlerGoogle}>
        <S.StyledGoogleLogo />
        <S.StyledGoogleLoginText>
          <span> Log in with Google</span>
        </S.StyledGoogleLoginText>
      </S.GoogleLoginContainer>
      <S.EmailSignupContainer>
        <div className="display-textbox">
          <strong>Display name</strong>
          <S.SignupInputBox
            type="text"
            onChange={handleInputValue('nickname')}
          />
        </div>
        <div className="email-textbox">
          <strong>Email</strong>
          <S.SignupInputBox type="text" onChange={handleInputValue('email')} />
        </div>
        <div className="password-textbox">
          <strong>Password</strong>
          <S.SignupInputBox
            type="password"
            onChange={handleInputValue('password')}
          />
          <S.PasswordNotice>
            Passwords must contain at least eight characters,
            <br />
            including at least 1 letter and 1 number.
          </S.PasswordNotice>
        </div>
        <S.SignupButton onClick={SignupRequestHandler}>
          <span>Sign up</span>
        </S.SignupButton>
        <S.BottomTextBox>
          <S.BottomText>
            By clicking “Sign up”, you agree to our terms of service and
            acknowledge that you have read and understand our privacy policy and
            code of conduct.
          </S.BottomText>
        </S.BottomTextBox>
      </S.EmailSignupContainer>
    </S.SignupWrapper>
  );
};

export default Signup;
