import * as S from './ProfileUser.styled';
// import { useSelector } from 'react-redux';

const ProfileUser = () => {
  // const user = useSelector((state) => state.userInfo.value);

  return (
    <div className="profile-user">
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.UserImg></S.UserImg>
          <S.UsernameContainer>
            <S.Username>{/* {user.nickname} */}</S.Username>
          </S.UsernameContainer>
        </S.ProfileContainer>
        <S.ProfileButtonBar>
          <S.Button>Profile</S.Button>
          <S.Button>Activity</S.Button>
          <S.Button>Saves</S.Button>
          <S.Setting>Setting</S.Setting>
        </S.ProfileButtonBar>
      </S.ProfileWrapper>
    </div>
  );
};

export default ProfileUser;
