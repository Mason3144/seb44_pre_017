// import { useState } from 'react';
// 1. Button 클릭 시, 클릭된 버튼만 주황색 컬러로 포커스 on, 나머지 버튼은 주황색 컬러로 포커스 false
// 2. 클릭 시, 페이지 navigate
import * as S from './ProfileSidebar.styled';

const ProfileSidebar = () => {
  //   const [selectedButton, setSelectedButton] = useState(null);

  //   const handleButtonClick = (buttonName) => {
  //     setSelectedButton(buttonName);
  //   };
  return (
    <div>
      <S.SidebarWrapper>
        <S.PersonalInfo>
          <S.Title>PERSONAL INFORMATION</S.Title>
          <S.Button>Edit profile</S.Button>
          <S.Button>Delete profile</S.Button>
        </S.PersonalInfo>
        <S.Access>
          <S.Title>Access</S.Title>
          <S.Button>Your logins</S.Button>
        </S.Access>
      </S.SidebarWrapper>
    </div>
  );
};

export default ProfileSidebar;
