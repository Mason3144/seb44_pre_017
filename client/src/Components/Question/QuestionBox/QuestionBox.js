import React from 'react';
import * as S from './QuestionBox.styled';

const QuestionBox = () => {

  return <S.ItemContainer>
    <S.Left>
        <S.Votes>0 votes</S.Votes>
        <S.Answers>0 answers</S.Answers>
        <S.Views> 0 Views</S.Views>
    </S.Left>
    <S.Right>
        <S.Title>제목</S.Title>
        <S.UserInfo>
            <S.User>작성자</S.User>
            <S.CreatedAt>날짜</S.CreatedAt>
        </S.UserInfo>
        <S.Empty></S.Empty>
    </S.Right>
  </S.ItemContainer>;
};

export default QuestionBox;
