import { styled } from 'styled-components';

export const PageGroup = styled.div`
  max-width: 768px;
  margin: 50px auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const MemoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fdf7e2;
  border: solid 1px #e7cf79;
  padding: 20px 25px;
  width: 100%;
  border-radius: 4px;
`;

export const TitleBox = styled.div`
  border: solid 1px lightgray;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
`;

export const TitleBanner = styled.h4`
  margin-top: 3px;
  margin-bottom: 5px;
`;

export const InputBox = styled.input`
  padding: 4px;
`;

export const BodyBox = styled.div`
  width: 100%;
  border: solid 1px lightgray;
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 440px;
  border-radius: 4px;
`;

export const BodyBanner = styled.h4`
  margin-top: 3px;
  margin-bottom: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

export const EditBtn = styled.button`
  background-color: #0995ff;
  border: solid 1px white;
  border-radius: 4px;
  padding: 13px;
  margin-right: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0968ff;
  }
`;

export const CancelBtn = styled.button`
  background-color: white;
  border: solid 1px white;
  border-radius: 4px;
  padding: 13px;
  color: #0995ff;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;
