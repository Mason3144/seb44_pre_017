import * as S from './ProfileYourLogins.styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
  const user = useSelector((state) => state.user.value);
  const memberId = useSelector((state) => state.userInfo.value.memberId);
  const navigate = useNavigate();

  const goToChangePassword = () => {
    navigate(`/members/${memberId}/yourlogin/change-password`);
  };

  return (
    <div className="profile-your-logins">
      <S.MyLoginsWrapper>
        <S.TitleWrapper>
          <S.Title>My Logins</S.Title>
          <S.Text>
            Log in or sign up on amu Stack Exchange site using these accounts
          </S.Text>
        </S.TitleWrapper>
        <S.SubTitle>Stack Exchange</S.SubTitle>
        <S.UserInfoWrapper>
          <S.Text>{user.username}</S.Text>
          <S.ButtonWrapper>
            <S.Button buttontype="changepassword" onClick={goToChangePassword}>
              Change password
            </S.Button>
            <S.RemoveButton buttontype="remove">Remove</S.RemoveButton>
          </S.ButtonWrapper>
        </S.UserInfoWrapper>
        <S.Button buttontype="addmorelogins">Add more logins...</S.Button>
      </S.MyLoginsWrapper>
    </div>
  );
};

export default ProfileUser;
