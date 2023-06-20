import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 224px;
  height: 524px;
  margin: 20px;
  gap: 30px;
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
`;

export const Access = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.div`
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 20px;
  width: 180px;
  height: 30px;
  color: white;
  text-align: center;
  padding-top: 7px;
  background-color: #e5883e;
  color: black;
  font-size: 14px;
`;
