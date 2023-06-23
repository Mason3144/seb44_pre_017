import { styled } from 'styled-components';

export const AllQuestionsGroup = styled.div``;

export const Question = styled.div`
  display: flex;
`;

export const QuestionBanner = styled.h1`
  margin-top: 32px;
  margin-left: 336px;
  font-size: xx-large;
  font-weight: 500;
`;

export const AskBtn = styled.button`
  background-color: #1eaeff;
  color: #ffffff;
  border: 1.5px solid #1eaeff;
  border-radius: 5px;
  padding: 10px;
  margin: 32px 0px 16px 704px;
  cursor: pointer;
  &:hover {
    background-color: #3172c6;
    border-color: #3172c6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-right: 0px;
  margin-left: 1067px;
`;

export const Buttons = styled.button`
  background-color: white;
  border: solid 1px #e4e5e7;
  width: 80px;
  height: 32px;
  border-radius: 4px;
  padding: 4px;
  margin: 0 2px;
  color: black;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e4e5e7;
    border: solid 1px #9ca3af;
  }
  &.active {
    background-color: #e4e5e7;
    border: solid 1px #9ca3af;
  }
`;

export const PageButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageButtonBox = styled.li`
  display: inline;
`;

export const PageButton = styled.button`
  background-color: white;
  border: solid 1px #e2e2e2;
  color: black;
  width: 30px;
  height: 32px;
  border-radius: 4px;
  padding: 4px;
  margin: 32px 4px;
  cursor: pointer;
  &:hover {
    background-color: #f48224;
  }
  &.active {
    background-color: #f48224;
  }
`;
