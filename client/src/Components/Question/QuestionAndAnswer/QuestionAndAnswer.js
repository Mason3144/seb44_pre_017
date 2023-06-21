/* eslint-disable react/prop-types*/
import * as S from './QuestionAndAnswer.styled';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Up } from '../../../icons/up.svg';
import { ReactComponent as Down } from '../../../icons/down.svg';
import { ReactComponent as Bookmark } from '../../../icons/bookmark.svg';
import { ReactComponent as History } from '../../../icons/history.svg';
import { ReactComponent as Adopt } from '../../../icons/adopt.svg';
import Comment from '../Comment/Comment';

function QuestionAndAnswer({ data, isQuestion }) {
  const navigate = useNavigate();
  const goAsk = () => {
    // if (로그인상태) {
    //   navigate('/questions/ask');
    // } else {
    navigate('/');
    // }
  };

  // const goedit = () => {
  //   if (질문) {
  //     navigate('/questions/{question-id}/edit');
  //   } else {
  //     navigate('/questions/{question-id}/answers/{answer-id}/edit');
  //   }
  // };

  const { createdAt } = data;

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `${Math.floor(seconds)} secs ago`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)} mins ago`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)} hours ago`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)} days ago`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)} weeks ago`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)} months ago`;
    const years = days / 365;
    return `${Math.floor(years)} years ago`;
  };

  const now = new Date({ createdAt });
  const nowDate = detailDate(now);

  let year = now.getFullYear();
  const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = now.getMonth();
  let day = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  const comments =
    data.comments &&
    data.comments.map((data) => <Comment data={data} key={data.commentId} />);

  return (
    <S.Container>
      {isQuestion === 'true' ? (
        <>
          <S.TitleContainer>
            <S.Title>{data.title}</S.Title>
            <S.AskBtn onClick={goAsk}>Ask Question</S.AskBtn>
          </S.TitleContainer>
          <S.Info>
            <S.Created>
              <span>Asked</span> {nowDate}
            </S.Created>
          </S.Info>
        </>
      ) : (
        ''
      )}
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
          {isQuestion === 'false' ? (
            <S.Adopt>
              <Adopt fill="#BBBFC4" />
            </S.Adopt>
          ) : (
            ''
          )}
          {/* <S.Adopt>
            <Adopt fill="#BBBFC4" />
          </S.Adopt> */}
          <div>
            <History />
          </div>
        </S.Side>
        <S.Content>
          {isQuestion === 'true' ? data.body : data.answerBody}
          <S.BottomLine>
            <S.Edit>Edit</S.Edit> {/*onClick!!*/}
            {data.writer ? <S.Writer>{data.writer.nickname}</S.Writer> : ''}
            <S.Date>{`asked ${monthName[month]} ${day}, ${year} at ${hours}:${minutes}`}</S.Date>
          </S.BottomLine>
        </S.Content>
      </S.Body>
      {isQuestion === 'false' ? (
        <>
          {comments}
          <S.Add>Add a comment</S.Add> {/*Onclick*/}
        </>
      ) : (
        ''
      )}
    </S.Container>
  );
}
export default QuestionAndAnswer;
