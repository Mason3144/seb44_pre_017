import * as S from './ProfileUser.styled';
import { useSelector } from 'react-redux';

const ProfileUser = () => {
  // const user = useSelector((state) => state.user.value)
  // 처음 렌더링 될 때, 유저 이미지를 서버에 요청해서 get 하는 코드
  const user = useSelector((state) => state.user.value);

  return (
    <div className="profile-user">
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.UserImg></S.UserImg>
          <S.UsernameContainer>
            <S.Username>{user.username}</S.Username>
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
