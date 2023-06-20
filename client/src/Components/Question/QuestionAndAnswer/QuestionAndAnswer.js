import * as S from './QuestionAndAnswer.styled';
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as Up } from '../../../icons/up.svg';
import { ReactComponent as Down } from '../../../icons/down.svg';
import { ReactComponent as Bookmark } from '../../../icons/bookmark.svg';
import { ReactComponent as History } from '../../../icons/history.svg';
import { ReactComponent as Adopt } from '../../../icons/adopt.svg';
import Comment from '../Comment/Comment';

function QuestionAndAnswer() {
  // const navigate = useNavigate();

  // const goedit = () => {
  //   if (질문) {
  //     navigate('/questions/{question-id}/edit');
  //   } else {
  //     navigate('/questions/{question-id}/answers/{answer-id}/edit');
  //   }
  // };

  return (
    <S.Container>
      <S.Title>How to split one column into 2 columns in hive table?</S.Title>
      <S.Info>
        <S.Created>
          <span>Asked</span> today
        </S.Created>
        <S.Viewed>
          <span>Veiwed</span> 9 times
        </S.Viewed>
      </S.Info>
      <S.Body>
        <S.Side>
          <div>
            <Up />
          </div>
          <S.Likes>0</S.Likes>
          <div>
            <Down />
          </div>
          <div>
            <Bookmark />
          </div>
          <S.Adopt>
            <Adopt fill="#BBBFC4" />
          </S.Adopt>
          <div>
            <History />
          </div>
        </S.Side>
        <S.Content>
          Git은 기본적으로 서로 다른 두 자리에서 각각 개발을 한 후 자신의
          소스코드를 원격 저장소로 업로드 하는 일을 기본으로 한다. 그렇기 때문에
          그럼 결국 같은 파일을 동시에 수정하고 커밋하는 일이 발생하게 된다. 그
          사례가 바로 위 스크린샷과 같은 사례인데, 왼쪽에 있는 사람은 둘째줄을
          수정한 뒤 commit을 하고 오른쪽에 있는 사람은 세번째 줄을 수정한 뒤
          commit하였다. 이는 서로 같은 파일을 수정한 것만약 윈도우 탐색기를 예로
          들면 A가 만든 파일을 덮어쓰기 한 후, B가 다시 와서 같은 파일을
          덮어쓰기 한 것과 같다. 그렇다면 기존 시스템에서는 둘 중 한명의 수정
          내역이 완전히 사라지게 될 것이다그러나 Git은 이런 경우 두 명의
          수정사항을 모두 반영한다. 하지만 서로 같은 줄을 각자 다르게 수정하면
          어떻게 될까? 그 경우는 Git에서 충돌이라는 별도의 처리 과정을 거치게
          되는데 그 부분은 다음 포스팅에서 다룰 예정이다. [출처] Git 기본기
          다지기 8 - Pull, Fetch, Merge|작성자 로드폴드
          <S.BottomLine>
            <S.Edit>Edit</S.Edit> {/*onClick!!*/}
            <S.Writer>작성자</S.Writer>
            <S.Date>asked Nov 9, 2010 at 7:56</S.Date>
          </S.BottomLine>
        </S.Content>
      </S.Body>
      <Comment />
      <S.Add>Add a comment</S.Add>
    </S.Container>
  );
}
export default QuestionAndAnswer;
