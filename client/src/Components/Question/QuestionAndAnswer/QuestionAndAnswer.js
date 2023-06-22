/* eslint-disable react/prop-types*/
import * as S from './QuestionAndAnswer.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { ReactComponent as Up } from '../../../icons/up.svg';
import { ReactComponent as Down } from '../../../icons/down.svg';
import { ReactComponent as Bookmark } from '../../../icons/bookmark.svg';
import { ReactComponent as History } from '../../../icons/history.svg';
import { ReactComponent as Adopt } from '../../../icons/adopt.svg';

import Comment from '../Comment/Comment';

function QuestionAndAnswer({ data, isQuestion }) {
  const { adopted } = data;
  const [isAdopted, setIsAdopted] = useState(adopted);
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const { questionId } = useParams();
  const { answerId } = useParams();

  const handleAddComment = () => {
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
        console.log('Error occurred while posting comment:', error.message);
      });
  };

  const handleAdopt = () => {
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
        setIsAdopted(!isAdopted);
      })
      .catch((error) => {
        console.log('Error occurred while posting answer:', error.message);
      });
  };

  const navigate = useNavigate();
  const goAsk = () => {
    // if (로그인상태) {
    //   navigate('/questions/ask');
    // } else {
    navigate('/');
    alert('로그인 후 질문이 가능합니다.');
    // }
  };

  const goEdit = () => {
    if (isQuestion === true) {
      navigate(`/questions/${questionId}/edit`);
    } else {
      navigate(`/questions/${questionId}/answers/${answerId}/edit`);
    }
  };

  const { createdAt } = data;

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

  const now = new Date({ createdAt });
  const nowDate = detailDate(now);

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
                onClick={adopted === false ? handleAdopt : null}
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
            <S.Edit onClick={goEdit}>Edit</S.Edit> {/*onClick!!*/}
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
              autofocus
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
