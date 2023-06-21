/* eslint-disable react/prop-types */
import { useState, useId, useEffect } from 'react';
import * as S from './QuestionUpdatePage.styled';
import WebEditor from '../../../Components/Question/QuestionBox/WebEditor';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionUpdatePage = () => {
  const navigate = useNavigate();

  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const { questionId } = useParams();

  useEffect(() => {
    const getQuestion = async () => {
      const source = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}`;
      const response = await axios.get(source);

      console.log(response);

      setTitleValue(response.data.title);
      setTextValue(response.data.body);
    };

    getQuestion();
  }, []);

  const onSubmit = async () => {
    const source = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/${questionId}/edit`;

    const response = await axios.patch(source, {
      title: titleValue,
      body: textValue,
    });

    if (response.status === 200) {
      navigate(`/questions/${questionId}`);
    }
  };

  return (
    <section>
      <S.PageGroup>
        <EditMemo />
        <EditTitleBox value={titleValue} setValue={setTitleValue} />
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
            Cancle
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

const EditTitleBox = ({ value, setValue }) => {
  const titleId = useId();

  const onChangeTitle = (event) => {
    const titleText = event.target.value;
    setValue(titleText);
  };
  return (
    <S.TitleBox>
      <label htmlFor={titleId}>
        <S.TitleBanner>Title</S.TitleBanner>
      </label>
      <S.InputBox
        type="text"
        id={titleId}
        value={value}
        onChange={onChangeTitle}
      />
    </S.TitleBox>
  );
};

export default QuestionUpdatePage;
