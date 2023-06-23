/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import QuestionBox from '../QuestionBox/QuestionBox';
import * as S from './AllQuestions.styled';

const AllQuestions = () => {
  const [searchParams] = useSearchParams();

  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState('new');

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    const getAllQuestions = async () => {
      setLoading(true);

      const source = `http://ec2-54-180-113-202.ap-northeast-2.compute.amazonaws.com:8080/questions/board?size=10&page=${page}&sort=${filterValue}`;
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
        <S.QuestionBanner>All Questions</S.QuestionBanner>
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

        {/* pagination 확인 위해 data 추가 */}
        <Posts question={question.data} loading={loading} />
        {!loading ? (
          <Pagination
            totalElements={question.pageInfo.totalElements * 32}
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
