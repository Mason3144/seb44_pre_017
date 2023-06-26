import * as S from './ProfileUser.styled';

const ProfileUser = () => {
  const nickname = localStorage.getItem('nickname');

  return (
    <div className="profile-user">
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.UserImg></S.UserImg>
          <S.UsernameContainer>
            <S.Username>{nickname}</S.Username>
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
