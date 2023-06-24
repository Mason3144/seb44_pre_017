/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import * as S from './AnswerUpdatePage.styled';
import WebEditor from '../../../Components/Question/QuestionBox/WebEditor';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AnswerUpdatePage = () => {
  const navigate = useNavigate();

  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const { questionId, answerId } = useParams();

  useEffect(() => {
    const getAnswer = async () => {
      const source = `/questions/${questionId}`;
      const response = await axios.get(source, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      });

      setTitleValue(response.data.title);
      setTextValue(response.data.body);
    };

    getAnswer();
  }, []);

  const onSubmit = async () => {
    const source = `/questions/${questionId}/answers/${answerId}/edit`;

    const response = await axios.patch(
      source,
      {
        answerBody: textValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      }
    );

    if (response.status === 200) {
      navigate(`/questions/${questionId}`);
    }
  };

  return (
    <section>
      <S.PageGroup>
        <EditMemo />
        <S.TitleBox>
          <S.TitleBanner>Title</S.TitleBanner>
          <S.Title>{titleValue}</S.Title>
        </S.TitleBox>
        <S.BodyBox>
          <S.BodyBanner>Body</S.BodyBanner>
          <WebEditor value={textValue} setValue={setTextValue} />
        </S.BodyBox>
        <S.ButtonGroup>
          <S.EditBtn onClick={onSubmit}>Save edits</S.EditBtn>
          <S.CancelBtn
            onClick={() => {
              navigate(`/questions/${questionId}`);
            }}
          >
            Cancel
          </S.CancelBtn>
        </S.ButtonGroup>
      </S.PageGroup>
    </section>
  );
};

const EditMemo = () => {
  return (
    <S.MemoBox>
      <span>
        Your edit will be placed in a queue until it is peer reviewed.
      </span>
      <br />
      <span>
        We welcome edits that make the post easier to understand and more
        valuable for readers. Because community members review edits, please try
        to make the post substantially better than how you found it, for
        example, by fixing grammar or adding additional resources and
        hyperlinks.
      </span>
    </S.MemoBox>
  );
};

export default AnswerUpdatePage;
