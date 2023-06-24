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
  const [answer, setAnswer] = useState(null);
  const { questionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/questions/${questionId}`)
      .then((res) => {
        setData(res.data);
        dispatch(writerInfo({ memberId: res.data.writer.memberId }));
      })
      .catch((error) => {
        console.log('Error occurred:', error.message);
      });
  }, []);

  const handleSubmit = () => {
    if (answer !== null) {
      setAnswer(null);
    }
    axios
      .post(
        `/questions/${questionId}/answers`,
        { answerBody: newAnswer },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        }
      )
      .then((res) => {
        setAnswer(res.data);
        setNewAnswer('');
      })
      .catch((error) => {
        console.log('Error occurred while posting answer:', error.message);
      });
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
      {answer !== null ? <QuestionAndAnswer data={answer} isQuestion={false} /> : ''}
      <S.Title>Your Answer</S.Title>
      <S.Editor>
        <WebEditor
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
      </S.Editor>
      <S.postBtn onClick={handleSubmit}>Post Your Answer</S.postBtn>
    </>
  );
}
export default QuestionDetail;
