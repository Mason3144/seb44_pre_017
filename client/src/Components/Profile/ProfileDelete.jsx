/* eslint-disable react/no-unescaped-entities */
import * as S from './ProfileDelete.styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../redux/login';

const ProfileDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. 리덕스 스토어에 저장된 memberId, nickname
  const resUserInfo = useSelector((state) => state.responseUserInfo.value);

  // 2. 작성된 글자
  const firstletter = `Before confirming that you would like your profile deleted, we'd like
          to take a moment to explain the implications of deletion:`;

  const secondletter1 = `Deletion is irreversible, and you will have no way to regain any
              of your original content, should this deletion be carried out and
              you change your mind later on.`;
  const secondlettet2 = `Your questions and answers will remain on the site, but will be
              disassociated and anonymized (the author will be listed as
              "user22069902") and will not indicate your authorship even if you
              later return to the site.`;

  const lastletter = `Confirming deletion will only delete your profile on Stack Overflow -
          it will not affect any of your other profiles on the Stack Exchange
          network. If you want to delete multiple profiles, you'll need to visit
          each site separately and request deletion of those individual
          profiles. I have read the information stated above and understand the
          implications of having my profile deleted.`;

  // 3. Delete 버튼 클릭 핸들러
  const DeleteRequestHandler = () => {
    // 3-1. URI에 참조될 memberId에 스토어에서 가져온 memberId 할당
    const memberId = resUserInfo.memberId;
    const url = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`;
    console.log(resUserInfo); // 스토어에 저장된 memberId가 전달되었는지 테스트할 콘솔

    // 3-2. 서버에 delete 요청. 요청 바디, 응답 객체 없음
    const res = axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 3-3. 상태코드 200일 경우, 리덕스 스토어의 로그인 상태 false로 변경 / 로그인 페이지(home)으로 이동
    if (res.status === 200) {
      alert('회원정보가 삭제되었습니다.');
      dispatch(setLoginState(false));
      navigate('/home');
      console.log(setLoginState); // 로그인 상태가 변경되었는지 테스트할 콘솔
    } else {
      return;
    }
  };

  return (
    <div className="profile-delete">
      <S.ProfileDeleteWrapper>
        <S.ProfileDeleteTitle>Detail Profile</S.ProfileDeleteTitle>
        <S.ProfileDeleteNotice>
          {firstletter}
          <br />
          <ul>
            <li>{secondletter1}</li>
            <li>{secondlettet2}</li>
            <p>id: {resUserInfo.memberId}</p>
            <p>password: {resUserInfo.nickname}</p>
          </ul>
          <br />
          {lastletter}
        </S.ProfileDeleteNotice>
        <S.DeleteButton onClick={DeleteRequestHandler}>
          Delete profile
        </S.DeleteButton>
      </S.ProfileDeleteWrapper>
    </div>
  );
};

export default ProfileDelete;
