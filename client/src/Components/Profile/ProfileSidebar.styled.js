/* eslint-disable import/no-named-as-default */
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
  gap: 8px;
`;

export const Title = styled.div`
  box-sizing: border-box;
  width: 159px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  display: flex;
  justify-content: flex-start;
`;

export const Access = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 20px;
  width: 190px;
  height: 30px;
  color: white;
  text-align: center;
  padding-top: 7px;
  font-size: 14px;
  background-color: ${({ isselected }) => (isselected ? '#e5883e' : 'white')};
  color: ${({ isselected }) => (isselected ? 'white' : '#000000')};
`;
