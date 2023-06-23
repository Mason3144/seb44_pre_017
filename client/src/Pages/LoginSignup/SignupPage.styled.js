/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { ReactComponent as StackoverflowLogo } from '../../Assets/stackoverflowLogo.svg';

export const SignupPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 5vw;
  gap: 3vh;
`;

export const WelcomTitle = styled.p`
  font-size: 30px;
`;

export const BottomText = styled.p`
  font-size: 14px;
`;

// AfterSignupPage

export const StyledStackoverflowLogo = styled(StackoverflowLogo)`
  width: 7%;
  height: 7%;
`;

export const Textcontentbox = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const AfterSignupPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7vh;
  margin: 20vh;
`;

export const IntroductionTextBox = styled.div`
  box-sizing: content-box;
  width: 45vw;
  text-align: center;
  font-size: 14px;
  line-height: 150%; // 줄 간격
`;
