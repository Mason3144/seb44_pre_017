/* eslint-disable react/prop-types */
// 1. Button 클릭 시, 클릭된 버튼만 주황색 컬러로 포커스 on, 나머지 버튼은 주황색 컬러로 포커스 false
// 2. 클릭 시, 페이지 navigate
import { useState } from 'react';
import * as S from './ProfileSidebar.styled';

const ProfileSidebar = ({ onComponentChange }) => {
  const [selectedButton, setSelectedButton] = useState('edit');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    onComponentChange(buttonName);
  };

  return (
    <div>
      <S.SidebarWrapper>
        <S.PersonalInfo>
          <S.Title>PERSONAL INFORMATION</S.Title>
          <S.Button
            onClick={() => handleButtonClick('edit')}
            isselected={selectedButton === 'edit' ? 'true' : undefined}
          >
            Edit profile
          </S.Button>
          <S.Button
            onClick={() => handleButtonClick('delete')}
            isselected={selectedButton === 'delete' ? 'true' : undefined}
          >
            Delete profile
          </S.Button>
        </S.PersonalInfo>
        <S.Access>
          <S.Title>Access</S.Title>
          <S.Button
            onClick={() => handleButtonClick('yourlogins')}
            isselected={selectedButton === 'yourlogins' ? 'true' : undefined}
          >
            Your logins
          </S.Button>
        </S.Access>
      </S.SidebarWrapper>
    </div>
  );
};

export default ProfileSidebar;
