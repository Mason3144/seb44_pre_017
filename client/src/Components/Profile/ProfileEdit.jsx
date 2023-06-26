/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import * as S from './ProfileEdit.styled';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { responseUserInfo } from '../../redux/userInfoSlice';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resUserInfo = useSelector((state) => state.responseUserInfo.value);

  const handleInputValue = (e) => {
    setDisplayName(e.target.value);
  };

  const changedUserInfo = {
    nickname: displayName,
  };

  const displayNameChangeHandler = async () => {
    if (displayName === '') {
      alert('이름을 입력해주세요.');
    } 
    else {
      try {
        const memberId = resUserInfo.memberId;
        const url = `${process.env.REACT_APP_API_URL}/members/${memberId}`;
        const res = await axios.patch(url, changedUserInfo, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        });
        console.log(res);
        if (res.status === 200) {
          alert('회원정보 수정이 완료되었습니다.');
          localStorage.setItem('nickname', res.data.nickname);
          location.reload('/questions');
          dispatch(responseUserInfo(res.data.nickname));
        }
      } catch (err) {
        console.error(err);
        alert('다시 시도해주세요.');
      }
    }
  };

  const cancelClickHandler = () => {
    alert('변경이 취소되었습니다.');
    navigate('/questions');
  };

  return (
    <S.ProfileEditWrapper>
      <S.Title>Edit your profile</S.Title>
      <S.SubTitle>Public information</S.SubTitle>
      <S.ProfileContainer>
        <S.ProfileImgBox>
          <S.SubTitle2>Profile image</S.SubTitle2>
          <S.ProfileImg></S.ProfileImg>
          <S.ProfileImgText>Change picture</S.ProfileImgText>
        </S.ProfileImgBox>
        <S.ProfileInfoBox>
          <S.SubTitle2>Display name</S.SubTitle2>
          <S.DisplayNameInput
            type="text"
            onChange={handleInputValue}
          ></S.DisplayNameInput>
        </S.ProfileInfoBox>
      </S.ProfileContainer>
      <S.ButtonContainer>
        <S.Button
          buttontype="save"
          className="save"
          onClick={displayNameChangeHandler}
        >
          Save profile
        </S.Button>
        <S.Button
          buttontype="cancel"
          className="cancel"
          onClick={cancelClickHandler}
        >
          Cancel
        </S.Button>
      </S.ButtonContainer>
    </S.ProfileEditWrapper>
  );
};

export default ProfileEdit;
