/* eslint-disable no-undef */
// Logic
// 1. New password 와 New password again이 같은지 유효성검사
// 2. 같다면, New password Input에 입력된 걸
// 클릭 시, patch 요청
// 1. 클릭 시, 유효성 검사 함수 동작
// 2. ok이면, patch 요청
import { useState } from 'react';
import * as S from './PasswordUpdatePage.styled.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PasswordUpdatePage = () => {
  const user = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordAgain: '',
  });
  const regExpPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

  const handleInputValue = (key) => (e) => {
    setNewPassword({ ...newPassword, [key]: e.target.value });
  };

  const SaveRequestHandler = async () => {
    if (
      newPassword.password.match(regExpPassword) === null ||
      newPassword.passwordAgain.match(regExpPassword) === null
    ) {
      return alert(
        '패스워드는 영문, 숫자, 특수기호를 포함하여 6자 이상이어야 합니다.'
      );
    } else if (newPassword.password !== newPassword.passwordAgain) {
      return alert('입력한 비밀번호가 같은지 확인해주세요.');
    } else {
      try {
        const memberId = user.memberId;
        const url = `${process.env.REACT_APP_API_URL}/${memberId}`;
        const requestPassword = {
          password: newPassword.password,
        };
        const res = await axios.patch(url, requestPassword, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        });
        if (res.status === 200) {
          alert('비밀번호가 변경되었습니다.');
          navigate('/questions');
        }
      } catch (err) {
        console.error(err);
        alert('다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="password-update-page">
      <S.PageWrapper>
        <S.Title>Change Password</S.Title>
        <S.SmallTextOfTitle>Change password for (email)</S.SmallTextOfTitle>
        <S.SubWrapper>
          <S.SubTitle>New Password</S.SubTitle>
          <S.Input onChange={handleInputValue('password')}></S.Input>
          <S.SubTitle>New Password (again)</S.SubTitle>
          <S.Input onChange={handleInputValue('passwordAgain')}></S.Input>
          <div></div>
          <S.Button onClick={SaveRequestHandler}>Save</S.Button>
        </S.SubWrapper>
      </S.PageWrapper>
    </div>
  );
};
export default PasswordUpdatePage;
