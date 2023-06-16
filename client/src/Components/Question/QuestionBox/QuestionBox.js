//질문 상세 페이지로 이동하기 위한 onClick 이벤트 사용으로 useNavigate 로직과 S.Title 주석 처리했습니다.
//답변수, 조회수, 제목, 작성자에 해당되는 텍스트는 페이지에서 map을 작성함에 따라 데이터 값에 해당되는 파라미터로 변경해야 합니다.

import React from 'react';
import * as S from './QuestionBox.styled';
// import { useNavigate } from 'react-router-dom';

const QuestionBox = ({ question }) => {
  // const navigate = useNavigate();

  // const goToQuestionDetail = () => {
  //     navigate("/questions/{question-id}");
  //   };

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `${Math.floor(seconds)}초 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  //api에 있는 detailPost.createdAt를 바꿔주는 것
  //시간 데이터에 해당하는 값을 axios로 호출한 데이터의 날짜 파라미터로 변경합니다.
  const nowDate = detailDate(new Date('2023-06-03T00:00:00.000000'));

  return (
    <S.ItemContainer>
      <S.Left>
        <S.Votes>0 votes</S.Votes>
        <S.Answers>0 answers</S.Answers>
        <S.Views>0 Views</S.Views>
      </S.Left>
      <S.Right>
        {/* <S.Title
          onClick={() => {
            goToQuestionDetail;
          }}
        >
          제목
        </S.Title> */}
        <S.UserInfo>
          <S.User>작성자</S.User>
          <S.CreatedAt>{nowDate}</S.CreatedAt>
        </S.UserInfo>
        <S.Empty></S.Empty>
      </S.Right>
    </S.ItemContainer>
  );
};

export default QuestionBox;
