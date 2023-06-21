/* eslint-disable react/no-unescaped-entities */
import * as S from './ProfileDelete.styled';
import axios from 'axios';

const ProfileDelete = () => {
  const memberId = '1';
  const userInfo = {};
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

  const DeleteRequestHandler = () => {
    const url = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/members/${memberId}`;

    const res = axios.delete(url, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      alert('회원정보가 삭제되었습니다.');
      // navigate('/')
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
          </ul>
          <br />
          {lastletter}
        </S.ProfileDeleteNotice>
        <S.DeleteButton onClick={DeleteRequestHandler}>
          Delete profile
        </S.DeleteButton>
        {/* axios delete 요청 */}
      </S.ProfileDeleteWrapper>
    </div>
  );
};

export default ProfileDelete;
