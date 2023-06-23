/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import { ReactComponent as StackoverflowLogo } from '../../Assets/stackoverflowLogo.svg';
import { ReactComponent as GoogleLogo } from '../../Assets/GoogleLogo.svg';

export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 3vh;
`;

export const GoogleLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid lightgray;
  width: 21vw;
  height: 5vh;
  border-radius: 5px;
  font-size: 15px;
`;

export const EmailSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.1px solid lightgray;
  box-shadow: 1px 1px 1px lightgray;
  background-color: white;
  width: 21vw;
  height: 55vh;
  border-radius: 5px;
  font-size: 15px;
  gap: 2vh;
`;

export const SignupInputBox = styled.input`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #9fa6ad;
  font-weight: bold;
  width: 17vw;
  height: 5vh;
  border-radius: 5px;
`;

export const PasswordNotice = styled.p`
  font-size: 11.8px;
  color: gray;
  margin-top: 1vh;
  margin-bottom: 0;
`;

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #0091ff;
  width: 17vw;
  height: 5vh;
  border-radius: 5px;
  font-size: 15px;
  background-color: #0091ff;
  color: white;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

export const StyledGoogleLogo = styled(GoogleLogo)`
  margin-right: 6px;
`;

export const StyledStackoverflowLogo = styled(StackoverflowLogo)`
  margin-top: 10px;
`;

export const StyledGoogleLoginText = styled.div`
  margin-top: 3px;
  font-size: 16px;
`;

export const BottomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  border: 1px solid white;
  width: 17vw;
`;

export const BottomText = styled.div`
  font-size: 12px;
  color: gray;
`;
