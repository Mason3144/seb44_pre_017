import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-left: 1px solid lightgray;
  gap: 12px;
  width: 742px;
  height: 524px;
  margin-left: 300px;
  padding-left: 30px;
  padding-top: 40px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
  font-size: 25px;
  font-weight: 600;
  width: 683px;
  padding-bottom: 10px;
`;

export const SmallTextOfTitle = styled.p`
  font-size: 14px;
  padding-top: 5px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 15px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 330px;
  height: 30px;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  &:hover {
    filter: brightness(85%);
  }
  border-radius: 5px;
  border: 0;
  background-color: #0091ff;
  color: #ffffff;
`;
