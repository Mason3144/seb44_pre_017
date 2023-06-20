import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionBox from '../QuestionBox/QuestionBox';
import axios from 'axios';
import * as S from './TopQuestions.styled';

export const TopQuestions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const goAsk = () => {
    navigate('/questions/ask');
  };

  useEffect(() => {
    axios
      .get(
        'http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/'
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log('Error occurred:', error.message);
      });
  }, []);

  const questions = data.map((question) => (
    <QuestionBox question={question} key={question.questionId} />
  ));
  return (
    <S.Container>
      <S.TitlContainer>
        <S.Title>Top Questions</S.Title>
        <S.AskBtn onClick={goAsk}>Ask Question</S.AskBtn>
      </S.TitlContainer>
      <S.Body>{questions}</S.Body>
    </S.Container>
  );
};
export default TopQuestions;
