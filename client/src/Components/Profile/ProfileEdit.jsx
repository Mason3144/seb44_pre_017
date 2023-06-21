/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import * as S from './ProfileEdit.styled';
import axios from 'axios';

const ProfileEdit = () => {
  const [displayName, setDisplayName] = useState('');
  const handleInputValue = (e) => {
    setDisplayName(e.target.value);
  };

  const changedUserInfo = {
    nickname: displayName,
  };

  const displayNameChangeHandler = async () => {
    if (displayName === '') {
      alert('이름을 입력해주세요.');
    } else {
      try {
        const memberId = '1';
        const url = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/member/${memberId}`;
        const res = await axios.patch(url, changedUserInfo, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        });
        if (res.status === 200) {
          alert('회원정보 수정이 완료되었습니다.');
        }
      } catch (err) {
        console.error(err);
        alert('다시 시도해주세요.');
      }
    }
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
        <S.Button buttontype="cancel" className="cancel">
          Cancel
        </S.Button>
      </S.ButtonContainer>
    </S.ProfileEditWrapper>
  );
};

export default ProfileEdit;
