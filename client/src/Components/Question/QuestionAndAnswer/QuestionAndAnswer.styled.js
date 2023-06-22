import styled from 'styled-components';
export const Container = styled.div`
  width: 1000px;
  margin-left: 350px;
  margin-top: 44px;
  padding-bottom: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 750px;
`;
export const AskBtn = styled.button`
  background-color: #1eaeff;
  color: #ffffff;
  border: 1.5px solid #1eaeff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #3172c6;
    border-color: #3172c6;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;
export const Info = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  margin: 20px 0;
  font-size: 12px;
  position: relative;
  &:after {
    margin-top: 100px;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: #e4e6e8;
  }
`;
export const Created = styled.div`
  > span {
    color: #6c737b;
  }
`;
export const Viewed = styled.div`
  > span {
    color: #6c737b;
  }
`;
export const Body = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e6e8;
`;
export const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const Likes = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
`;
export const Content = styled.div`
  line-height: 1.7em;
`;
export const BottomLine = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
`;
export const Edit = styled.div`
  color: #6c737b;
  cursor: pointer;
  &:hover {
    color: #8ebefa;
  }
`;
export const Writer = styled.div`
  margin-left: 500px;
  color: #3172c6;
`;
export const Date = styled.div`
  color: #6c737b;
`;

export const Add = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border-bottom: 1px solid #e4e6e8;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
export const AddText = styled.div`
  color: #bbbfc4;
`;
export const AddBtn = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background-color: #e5883e;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  &:hover {
    background-color: #edb07f;
  }
`;

export const CommentInput = styled.input`
  width: 80%;
  height: 2em;
  border-radius: 3px;
  resize: none;
  border: none;
  background-color: #e4e6e8;
  &:focus {
    outline: 2px solid #3172c6;
  }
`;

export const Adopt = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e3ecf3;
  }
`;
