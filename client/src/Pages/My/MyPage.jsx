import { useState } from 'react';
import ProfileUser from '../../Components/Profile/ProfileUser.jsx';
import ProfileSidebar from '../../Components/Profile/ProfileSidebar.jsx';
import ProfileEdit from '../../Components/Profile/ProfileEdit.jsx';
import Header from '../../Components/Common/Header/Header.js';
import Sidebar from '../../Components/Common/Sidebar/Sidebar.js';
import Footer from '../../Components/Common/Footer/Footer.js';
import ProfileDelete from '../../Components/Profile/ProfileDelete.jsx';
import * as S from './MyPage.styled.js';

const MyPage = () => {
  const [seletedComponent, setSelectedComponent] = useState('edit');

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="mypage">
      <Header />
      <Sidebar />
      <S.MypageWrapper>
        <ProfileUser />
        <S.layout>
          <ProfileSidebar onComponentChange={handleComponentChange} />
          <S.ChangeDisplayContainer>
            {seletedComponent === 'edit' && <ProfileEdit />}
            {seletedComponent === 'delete' && <ProfileDelete />}
            {seletedComponent === 'yourlogins' && (
              <div>Your Logins 컴포넌트</div>
            )}
          </S.ChangeDisplayContainer>
        </S.layout>
      </S.MypageWrapper>
      <Footer />
    </div>
  );
};
export default MyPage;
