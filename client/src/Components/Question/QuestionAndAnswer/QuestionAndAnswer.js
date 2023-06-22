/* eslint-disable react/prop-types*/
import * as S from './QuestionAndAnswer.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { ReactComponent as Up } from '../../../icons/up.svg';
import { ReactComponent as Down } from '../../../icons/down.svg';
import { ReactComponent as Bookmark } from '../../../icons/bookmark.svg';
import { ReactComponent as History } from '../../../icons/history.svg';
import { ReactComponent as Adopt } from '../../../icons/adopt.svg';

import Comment from '../Comment/Comment';

function QuestionAndAnswer({ data, isQuestion }) {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { answerId } = data;
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isAdopted, setIsAdopted] = useState('');

  const memberId = () => data?.writer?.memberId;
  const login = useSelector((state) => state.login); //로그인상태
  const questionWriter = useSelector((state) => state.writer.value.memberId); //질문자Id
  const userId = useSelector((state) => state.userInfo.value.memberId); //사용자Id
  const { createdAt } = data;
  const { adopted } = data;
  useEffect(() => {
    {
      setIsAdopted(adopted);
    }
  }, [adopted]);

  const handleComment = useCallback((e) => {
    setNewComment(e.target.value);
  }, []);

  const handleAddComment = useCallback(() => {
    //댓글등록
    axios
      .post(
        `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/answers/${answerId}/comments`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        }
      )
      .then((res) => {
        setComment(res.data);
        setNewComment('');
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            alert('로그인 후 이용이 가능합니다.');
          } else {
            console.log(error.message);
          }
        }
      });
  }, [questionId, answerId]);

  const handleAdopt = useCallback(() => {
    //채택
    if (questionWriter === userId) {
      //질문 작성자와 사용자가 같을 때
      axios
        .post(
          `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/answers${answerId}/adopt`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('Authorization'),
            },
          }
        )
        .then(() => {
          setIsAdopted(true);
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
    } else {
      alert('질문 작성자만 채택이 가능합니다.');
    }
  }, [questionWriter, userId, questionId, answerId]);

  const handleAdoptDelete = useCallback(() => {
    if (questionWriter === userId) {
      //질문작성자와 사용자가 같을 때
      axios
        .delete(
          `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/answers${answerId}/adopt`
        )
        .then(() => {
          setIsAdopted(false);
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
    } else {
      null;
    }
  }, [questionWriter, userId, questionId, answerId]);

  const handleDelete = useCallback(() => {
    //질문, 답변 삭제
    if (memberId === userId && window.confirm('삭제하시겠습니까?')) {
      //작성자와 사용자의 Id가 같고
      if (isQuestion === true) {
        //질문인 경우
        axios
          .delete(
            `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}`
          )
          .then(() => {
            console.log('삭제 성공');
            alert('질문이 삭제되었습니다.');
            navigate('/questions/board');
          })
          .catch((error) => {
            console.log('Error:', error.message);
          });
      } else {
        //답변인 경우
        axios
          .delete(
            `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/answers/${answerId}`
          )
          .then(() => {
            console.log('삭제 성공');
            alert('답변이 삭제되었습니다.');
            navigate('/questions/board');
          })
          .catch((error) => {
            console.log('Error:', error.message);
          });
      }
    } else {
      alert('작성자만 삭제가 가능합니다.');
    }
  }, [memberId, userId, questionId, isQuestion]);

  //질문
  const goAsk = useCallback(() => {
    if (login === true) {
      navigate('/questions/ask');
    } else {
      navigate('/login');
      alert('로그인 후 이용이 가능합니다.');
    }
  }, [login, navigate]);

  //수정
  const goEdit = useCallback(() => {
    if (memberId === userId) {
      //작성자와 사용자 Id가 같을 때
      if (isQuestion === true) {
        //질문인 경우
        navigate(`/questions/${questionId}/edit`);
      } else {
        //답변인 경우
        navigate(`/questions/${questionId}/answers/${answerId}/edit`);
      }
    } else {
      alert('작성자만 수정이 가능합니다.');
    }
  }, [memberId, userId, isQuestion, questionId, answerId]);

  const detailDate = useCallback((a) => {
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
  }, []);

  const now = useMemo(() => new Date({ createdAt }), [createdAt]);
  const nowDate = useMemo(() => detailDate(now), [detailDate, now]);

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
      {isQuestion === true ? (
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
          {isQuestion === false ? (
            <S.Adopt>
              <Adopt
                onClick={adopted === false ? handleAdopt : handleAdoptDelete}
                fill={isAdopted === false ? '#BBBFC4' : 'green'}
              />
            </S.Adopt>
          ) : (
            ''
          )}
          <div>
            <History />
          </div>
        </S.Side>
        <S.Content>
          {isQuestion === true ? data.body : data.answerBody}
          <S.BottomLine>
            <S.Edit onClick={goEdit}>Edit</S.Edit>
            <S.Delete onClick={handleDelete}>Delete</S.Delete>
            {data.writer ? <S.Writer>{data.writer.nickname}</S.Writer> : ''}
            <S.Date>{`asked ${monthName[month]} ${day}, ${year} at ${hours}:${minutes}`}</S.Date>
          </S.BottomLine>
        </S.Content>
      </S.Body>
      {isQuestion === false ? (
        <>
          {comments}
          {comment > 0 ? <Comment data={comment} /> : ''}
          <S.Add>
            <S.AddText>Add a coment</S.AddText>
            <S.CommentInput
              type="text"
              value={newComment}
              onChange={handleComment}
            ></S.CommentInput>
            <S.AddBtn onClick={handleAddComment}>Add</S.AddBtn>
          </S.Add>
        </>
      ) : (
        ''
      )}
    </S.Container>
  );
}

// function QuestionAndAnswer({ data, isQuestion }) {
//   // const questionWriter = useSelector((state) => state.writer.value.memberId);
//   return (
//     <QuestionAndAnswerContainer
//       data={data}
//       isQuestion={isQuestion}
//       questionWriter={questionWriter}
//     />
//   );
// }
export default QuestionAndAnswer;
