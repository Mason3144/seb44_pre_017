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
  // 1. 변수 설정
  // 1-1. user 리덕스 userInfo 불러오기
  // 1-2. new password / new password(again) 상태 저장
  // 1-3. 비밀번호 유효성검사 정규 표현식
  const user = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordAgain: '',
  });
  const regExpPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,20}$/;

  // 2. input 창에 타이핑 시, 비밀번호 상태에 저장
  const handleInputValue = (key) => (e) => {
    setNewPassword({ ...newPassword, [key]: e.target.value });
  };

  // 3. save 버튼 클릭 시 비밀번호 patch 요청 함수 실행
  // 3-1. 비밀번호 유효성 검사(패스워드 again과 같은지 확인 / 유효성 검증 확인)
  // 3-2. axios로 서버에 patch 요청
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
        const url = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/${memberId}`;
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
          navigate('/questions/');
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
