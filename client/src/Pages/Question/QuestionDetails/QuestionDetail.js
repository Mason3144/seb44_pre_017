import * as S from './QuestionDetail.styled';
import { useState, useEffect } from 'react';
import QuestionAndAnswer from '../../../Components/Question/QuestionAndAnswer/QuestionAndAnswer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WebEditor from '../../../Components/Question/QuestionBox/WebEditor';
function QuestionDetail() {
  const [data, setData] = useState({});
  const [newAnswer, setNewAnswer] = useState('');
  const [answer, setAnswer] = useState({});

  const { questionId } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log('Error occurred:', error.message);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/answers`,
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
      {answer > 0 ? <QuestionAndAnswer data={answer} isQuestion={false} /> : ''}
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
