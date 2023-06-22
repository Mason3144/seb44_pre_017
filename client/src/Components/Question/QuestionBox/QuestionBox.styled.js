import styled from 'styled-components';
export const ItemContainer = styled.li`
  list-style: none;
  height: 130px;
  width: 100%;
  display: flex;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 20%;
    top: 0;
    height: 1px;
    width: 70%;
    background-color: #e4e6e8;
  }
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 10px;
  margin-left: 20%;
  font-size: 14px;
  font-weight: 500;
`;
export const Votes = styled.div``;
export const Answers = styled.div``;
export const Views = styled.div``;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 1;
`;
export const Title = styled.div`
  display: flex;
  margin-left: 30px;
  font-size: 16px;
  color: #3172c6;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #4393f7;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 180px;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
`;
export const User = styled.div`
  color: #3172c6;
`;
export const CreatedAt = styled.div``;
export const Empty = styled.div``;
