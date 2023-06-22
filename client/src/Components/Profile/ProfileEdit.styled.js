/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';

export const ProfileEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 10px;
  width: 742px;
  height: 524px;
`;

export const Title = styled.span`
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
  font-size: 25px;
  font-weight: 600;
  width: 683px;
  padding-bottom: 10px;
`;

export const SubTitle = styled.span`
  font-size: 17px;
  padding-top: 20px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid lightgray;
  width: 683px;
  height: 299px;
  padding-top: 40px;
  padding-left: 25px;
  gap: 20px;
`;

export const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileImg = styled.div`
  background-color: lightgray;
  border-radius: 5px 5px 0 0;
  width: 134px;
  height: 110px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileImgText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-top: 0;
  border-radius: 0 0 5px 5px;
  width: 134px;
  height: 30px;
  color: white;
  font-size: 12px;
  font-weight: 400;
`;
export const ProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle2 = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const DisplayNameInput = styled.input`
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 3px;
  width: 330px;
  height: 25px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 20px;
`;

export const Button = styled.button`
  width: 75px;
  height: 30px;
  font-size: 10px;
  font-weight: 100;
  border: 0;
  &:hover {
    filter: brightness(85%);
  }
  border-radius: 5px;
  background-color: ${(props) =>
    props.buttontype === 'save' ? '#0091FF' : 'white'};
  color: ${(props) => (props.buttontype === 'save' ? 'white' : '#0091FF')};
`;
