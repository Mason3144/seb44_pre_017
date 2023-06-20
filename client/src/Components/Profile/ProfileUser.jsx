import { useState, useEffect } from 'react';
import * as S from './ProfileUser.styled';
import axios from 'axios';
// import { useSelector } from 'react-redux';

const ProfileUser = () => {
  // const user = useSelector((state) => state.user.value)
  // 처음 렌더링 될 때, 유저 이미지를 서버에 요청해서 get 하는 코드
  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    const url =
      'http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/';
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setUserImg(res.data.member.memberId);
        // 이미지 상태값에 임시로 응답 객체의 memberId 저장
        // 추후 응답 객체의 이미지 데이터로 수정해야 함.
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(userImg);

  return (
    <div className="profile-user">
      <S.ProfileWrapper>
        <S.ProfileContainer>
          <S.UserImg>{userImg}</S.UserImg>
          <S.UsernameContainer>
            <S.Username>
              Username
              {/* {user.name} 전역 상태에 저장된 user 정보 불러오기 */}
            </S.Username>
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
