/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 966px;
  height: 210px;
  margin: 20px;
`;
export const ProfileContainer = styled.div`
  display: flex;
`;

export const UserImg = styled.div`
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 145px;
  height: 145px;
`;

export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin-left: 20px;
`;

export const Username = styled.span`
  font-size: 25px;
`;

export const ProfileButtonBar = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-top: 20px;
`;

export const Button = styled.div`
  text-align: center;
  box-sizing: border-box;
  width: 80px;
  height: 32px;
  padding-top: 7px;
`;

export const Setting = styled.div`
  box-sizing: border-box;
  border: 1px solid white;
  border-radius: 20px;
  width: 80px;
  height: 35px;
  color: white;
  text-align: center;
  padding-top: 7px;
  background-color: #e5883e;
`;
