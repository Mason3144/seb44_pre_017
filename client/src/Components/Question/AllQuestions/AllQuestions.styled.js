import { styled } from 'styled-components';

export const AllQuestionsGroup = styled.div``;

export const QuestionBanner = styled.h1`
  margin: 3px 10px 5px;
  font-size: xx-large;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
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
  margin: 0 4px;
  &:hover {
    background-color: #f48224;
  }
  &.active {
    background-color: #f48224;
  }
`;
