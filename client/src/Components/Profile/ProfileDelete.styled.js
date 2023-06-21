/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';

export const ProfileDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const ProfileDeleteTitle = styled.div`
  font-size: 25px;
  margin-top: 15px;
  padding-bottom: 10px;
  width: 683px;
  border-bottom: 1px solid lightgray;
`;

export const ProfileDeleteNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  padding-bottom: 10px;
  width: 683px;
  height: 350px;
  color: black;
  background-color: lightgray;
  box-sizing: border-box;
  border: 1px solid lightgray;
  gap: 10px;
  padding: 15px;

  ul {
    list-style: none;
    padding-left: 0;
    margin-left: 0;
  }

  li::before {
    content: '•';
  }
`;

export const DeleteButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  border: 0.1px solid #e2e2e2;
  color: white;
  background-color: rgba(186, 29, 29, 0.869);
  &:hover {
    background-color: rgba(254, 4, 4, 1);
    border: rgba(0, 0, 0, 1);
  }
`;
