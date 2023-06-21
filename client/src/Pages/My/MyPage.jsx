import { useState } from 'react';
import ProfileUser from '../../Components/Profile/ProfileUser.jsx';
import ProfileSidebar from '../../Components/Profile/ProfileSidebar.jsx';
import ProfileEdit from '../../Components/Profile/ProfileEdit.jsx';
import * as S from './MyPage.styled.js';

const MyPage = () => {
  const [seletedComponent, setSelectedComponent] = useState('edit');

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div>
      <ProfileUser />
      <S.layout>
        <ProfileSidebar onComponentChange={handleComponentChange} />
        <S.ChangeDisplayContainer>
          {seletedComponent === 'edit' && <ProfileEdit />}
          {seletedComponent === 'delete' && <div>Delete profile 컴포넌트</div>}
          {seletedComponent === 'yourlogins' && <div>Your Logins 컴포넌트</div>}
        </S.ChangeDisplayContainer>
      </S.layout>
    </div>
  );
};
export default MyPage;
