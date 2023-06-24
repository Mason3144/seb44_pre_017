/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import QuestionBox from '../QuestionBox/QuestionBox';
import * as S from './AllQuestions.styled';

const AllQuestions = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('new');

  const page = searchParams.get('page') ?? 1;

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
    const getAllQuestions = async () => {
      setLoading(true);

      const source = `/questions/board?size=10&page=${page}&sort=${filterValue}`;
      const response = await axios.get(source, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Authorization'),
        },
      });
      setQuestion(response.data);
      setLoading(false);
    };

    getAllQuestions();
  }, [page, filterValue]);

  return (
    <section>
      <S.AllQuestionsGroup>
        <S.Question>
          <S.QuestionBanner>All Questions</S.QuestionBanner>
          <S.AskBtn onClick={goAsk}>Ask Question</S.AskBtn>
        </S.Question>
        <S.ButtonGroup>
          <S.Buttons
            onClick={() => setFilterValue('new')}
            className={filterValue === 'new' ? 'active' : ''}
          >
            New
          </S.Buttons>
          <S.Buttons
            onClick={() => setFilterValue('views')}
            className={filterValue === 'views' ? 'active' : ''}
          >
            Views
          </S.Buttons>
          <S.Buttons
            onClick={() => setFilterValue('answered')}
            className={filterValue === 'answered' ? 'active' : ''}
          >
            Answered
          </S.Buttons>
        </S.ButtonGroup>
        <Posts question={question.data} loading={loading} />
        {!loading ? (
          <Pagination
            totalElements={question.pageInfo.totalElements}
            size={question.pageInfo.size}
          />
        ) : null}
      </S.AllQuestionsGroup>
    </section>
  );
};

const Posts = ({ question, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {question.map((question) => (
        <QuestionBox key={question.questionId} question={question} />
      ))}
    </ul>
  );
};

const Pagination = ({ size, totalElements }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const onPaginate = (pageNumber) => {
    setSearchParams({
      page: pageNumber,
    });
  };

  const pageNumbers = Array.from(
    { length: Math.ceil(totalElements / size) },
    (_, i) => i + 1
  );

  return (
    <div>
      <nav>
        <S.PageButtonGroup>
          {pageNumbers.map((pageNumber) => (
            <S.PageButtonBox key={pageNumber}>
              <S.PageButton
                onClick={() => onPaginate(pageNumber)}
                className={page === pageNumber.toString() ? 'active' : ''}
              >
                {pageNumber}
              </S.PageButton>
            </S.PageButtonBox>
          ))}
        </S.PageButtonGroup>
      </nav>
    </div>
  );
};

export default AllQuestions;
