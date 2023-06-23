/* eslint-disable no-undef */
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionBox from '../QuestionBox/QuestionBox';
import axios from 'axios';
import * as S from './TopQuestions.styled';

export const TopQuestions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const login = useSelector((state) => state.login);

  const goAsk = () => {
    if (login === true) {
      navigate('/questions/ask');
    } else {
      navigate('/login');
      alert('로그인 후 이용이 가능합니다.');
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/home`)
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
