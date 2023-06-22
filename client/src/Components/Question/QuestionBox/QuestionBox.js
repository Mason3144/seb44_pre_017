/* eslint-disable react/prop-types*/
import * as S from './QuestionBox.styled';
import { useNavigate } from 'react-router-dom';

const QuestionBox = ({ question }) => {
  const navigate = useNavigate();

  const goToQuestionDetail = () => {
    const questionId = question.questionId;
    navigate(`/questions/${questionId}`);
  };

  const { created_at } = question;

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

  const nowDate = detailDate(new Date({ created_at }));

  return (
    <S.ItemContainer>
      <S.Left>
        <S.Votes>0 votes</S.Votes>
        <S.Answers>{question.commentsNumber} answers</S.Answers>
        <S.Views>{question.views} views</S.Views>
      </S.Left>
      <S.Right>
        <S.Title onClick={goToQuestionDetail}>{question.title}</S.Title>
        <S.UserInfo>
          <S.User>{question.writer.nickname}</S.User>
          <S.CreatedAt>{nowDate}</S.CreatedAt>
        </S.UserInfo>
        <S.Empty></S.Empty>
      </S.Right>
    </S.ItemContainer>
  );
};

export default QuestionBox;
