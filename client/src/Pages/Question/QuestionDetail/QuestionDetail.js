/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import * as S from './QuestionDetail.styled';
import { useState, useEffect } from 'react';
import QuestionAndAnswer from '../../../Components/Question/QuestionAndAnswer/QuestionAndAnswer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WebEditor from '../../../Components/Question/QuestionBox/WebEditor';
import { useDispatch } from 'react-redux';
import { writerInfo } from '../../../redux/writerSlice';

function QuestionDetail() {
  const [data, setData] = useState({});
  const [newAnswer, setNewAnswer] = useState('');
  const { questionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`)
      .then((res) => {
        setData(res.data);
        dispatch(writerInfo({ memberId: res.data.writer.memberId }));
      })
      .catch((error) => {
        console.log('Error occurred:', error.message);
      });
  }, [data]);

  const handleSubmit = () => {
    if (newAnswer === '') {
      alert('답변을 입력해주세요.');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers`,
          { answerBody: newAnswer },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('Authorization'),
            },
          }
        )
        .then(() => {
          setNewAnswer('');
        })
        .catch((error) => {
          console.log('Error occurred while posting answer:', error.message);
          if (error.response.status === 401) {
            alert('로그인이 필요합니다.');
          } else {
            return;
          }
        });
    }
  };

  const answers =
    data.answers &&
    data.answers.map((data) => (
      <QuestionAndAnswer data={data} key={data.answerId} isQuestion={false} />
    ));

  return (
    <>
      <QuestionAndAnswer data={data} isQuestion={true} />
      <S.Title>{data.answers ? data.answers.length : '0'} Answers</S.Title>
      <S.AnswerContainer>{answers}</S.AnswerContainer>
      <S.Title>Your Answer</S.Title>
      <S.Editor>
        <WebEditor value={newAnswer} setValue={setNewAnswer} />
      </S.Editor>
      <S.postBtn onClick={handleSubmit}>Post Your Answer</S.postBtn>
    </>
  );
}
export default QuestionDetail;
