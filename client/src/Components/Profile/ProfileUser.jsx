import * as S from './ProfileUser.styled';

const ProfileUser = () => {
  const nickname = localStorage.getItem('nickname');
  const makeFirstName = (nickname) => {
    let firstName = '';
    // 한글인 경우
    if (/^[가-힣]+$/.test(nickname)) {
      const nameLength = nickname.length;

      if (nameLength === 2 || nameLength === 3 || nameLength === 4) {
        firstName = nickname.slice(nameLength - 2);
      }
    }
    // 영어
    else if (/^[A-Za-z]+$/.test(nickname)) {
      const spaceIndex = nickname.indexOf('');
      if (spaceIndex !== -1) {
        firstName = nickname.substring(0, spaceIndex);
      }
    } else {
      const nameLength = nickname.length;
      for (let i = 1; i < nameLength; i++) {
        if (nickname[i] === nickname[i].toUpperCase()) {
          firstName = name.substring(0, i);
          break;
        }
      }
    }
    return firstName;
  };

  return (
    <div className="profile-user">
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.UserImg>{makeFirstName(nickname)}</S.UserImg>
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
