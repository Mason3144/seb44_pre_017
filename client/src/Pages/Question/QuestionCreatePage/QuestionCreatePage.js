/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useId, useState } from 'react';
import * as S from './QuestionCreatePage.styled';
import { ReactComponent as Question } from '../../../images/question.svg';
import axios from 'axios';
import WebEditor from '../../../Components/Question/QuestionBox/WebEditor';
import { useNavigate } from 'react-router-dom';

const QuestionCreatePage = () => {
  const navigate = useNavigate();

  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const onSubmit = async () => {
    if (titleValue.length > 50) {
      alert('Title should be 50 characters or less.');
      return;
    }

    if (textValue.length < 20) {
      alert('Text should be at least 20 characters.');
      return;
    }

    const source = `${process.env.REACT_APP_API_URL}/questions/ask`;
    const response = await axios.post(
      source,
      {
        title: titleValue,
        body: textValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      }
    );

    if (response.status === 201) {
      navigate('/questions/board');
    }
  };

  return (
    <section>
      <S.PageGroup>
        <S.PageBanner>
          <S.PageTitle>Ask a public question </S.PageTitle>
          <Question width="330px" height="200px" alt="QuestionPageLogo" />
        </S.PageBanner>
        <QuestionTips />
        <QuestionTitleBox value={titleValue} setValue={setTitleValue} />
        <S.BodyBox>
          <S.BodyBanner>Body</S.BodyBanner>
          <S.BodyNote>
            The body of your question contains your problem details and results.
          </S.BodyNote>
          <WebEditor value={textValue} setValue={setTextValue} />
        </S.BodyBox>
        <S.SubmitBtn onClick={onSubmit}>Post your question</S.SubmitBtn>
      </S.PageGroup>
    </section>
  );
};

const QuestionTips = () => {
  return (
    <S.TipsBox>
      <S.TipTitle>Writing a good question</S.TipTitle>
      <S.Tipguide>
        You’re ready to ask a programming-related question and this form will
        help guide you through the process. Looking to ask a non-programming
        question? See the topics here to find a relevant site.
      </S.Tipguide>
      <S.TipsStep>steps</S.TipsStep>
      <ul>
        <li> Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected to happen.</li>
        <li>
          Add “tags” which help surface your question to members of the
          community.
        </li>
        <li>Review your question and post it to the site.</li>
      </ul>
    </S.TipsBox>
  );
};

const QuestionTitleBox = ({ value, setValue }) => {
  const titleId = useId();

  const onChangeTitle = (event) => {
    const titleText = event.target.value;
    setValue(titleText);
  };

  return (
    <S.TitleBox>
      <label htmlFor={titleId}>
        <S.TitleBanner>Title</S.TitleBanner>
        <S.TitleNote>
          Be specific and imagine you’re asking a question to another person.
        </S.TitleNote>
      </label>
      <S.InputBox
        type="text"
        id={titleId}
        value={value}
        onChange={onChangeTitle}
        placeholder="e.g Is there an R function for finding the index of an element in a vector?"
      />
    </S.TitleBox>
  );
};

export default QuestionCreatePage;
