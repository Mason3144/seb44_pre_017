/* eslint-disable no-undef */
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
  const [newComment, setNewComment] = useState('');
  const [isAdopted, setIsAdopted] = useState('');

  const memberId = data.writer ? data.writer.memberId : '';
  const login = useSelector((state) => state.login);
  const questionWriter = useSelector((state) => state.writer.value.memberId);
  const userId = Number(useSelector((state) => state.userInfo.value.memberId));
  const { createdAt } = data;
  const { adopted } = data;

  let realBody = '';
  if (data.body !== undefined) {
    realBody = data.body.replace(/[<][^>]*[>]/g, '');
  }

  let realAnswerBody = '';
  if (data.answerBody !== undefined) {
    realAnswerBody = data.answerBody.replace(/[<][^>]*[>]/g, '');
  }

  useEffect(() => {
    {
      setIsAdopted(adopted);
    }
  }, [adopted]);

  const handleAddComment = useCallback(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}/comments`,
        { commentBody: newComment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
          },
        }
      )
      .then(() => {
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
  }, [questionId, answerId, newComment]);

  const handleAdopt = useCallback(() => {
    console.log(typeof questionWriter);
    console.log(typeof userId);
    if (questionWriter === userId) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}/adopt`,
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
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}/adopt`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('Authorization'),
            },
          }
        )
        .then(() => {
          setIsAdopted(false);
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
    } else {
      alert('질문 작성자만 채택 취소가 가능합니다.');
    }
  }, [questionWriter, userId, questionId, answerId]);

  const handleDelete = useCallback(() => {
    if (memberId === userId) {
      if (window.confirm('삭제하시겠습니까?')) {
        if (isQuestion === true) {
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/questions/${questionId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: localStorage.getItem('Authorization'),
                },
              }
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
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/questions/${questionId}/answers/${answerId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: localStorage.getItem('Authorization'),
                },
              }
            )
            .then(() => {
              console.log('삭제 성공');
              alert('답변이 삭제되었습니다.');
            })
            .catch((error) => {
              console.log('Error:', error.message);
            });
        }
      }
    } else {
      alert('작성자만 삭제가 가능합니다.');
    }
  }, [memberId, userId, questionId, isQuestion]);

  const goAsk = useCallback(() => {
    if (login === true) {
      navigate('/questions/ask');
    } else {
      navigate('/login');
      alert('로그인 후 이용이 가능합니다.');
    }
  }, [login, navigate]);

  const goEdit = useCallback(() => {
    if (memberId === userId) {
      // !== 으로 시도해보기
      if (isQuestion === true) {
        navigate(`/questions/${questionId}/edit`);
      } else {
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

  const now = useMemo(() => new Date(createdAt), [createdAt]);
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
          {isQuestion ? (
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data.answerBody }} />
          )}
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
          <S.Add>
            <S.AddText>Add a coment</S.AddText>
            <S.CommentInput
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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

export default QuestionAndAnswer;
