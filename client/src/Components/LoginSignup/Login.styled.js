import styled from 'styled-components';
import { ReactComponent as StackoverflowLogo } from '../../Assets/stackoverflowLogo.svg';
import { ReactComponent as GoogleLogo } from '../../Assets/GoogleLogo.svg';

export const LoginWrapper = styled.div`
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

export const EmailLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.1px solid lightgray;
  box-shadow: 1px 1px 1px lightgray;
  background-color: white;
  width: 21vw;
  height: 30vh;
  border-radius: 5px;
  font-size: 15px;
  gap: 2vh;
`;

export const LoginInputBox = styled.input`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid gray;
  font-weight: bold;
  width: 17vw;
  height: 5vh;
  border-radius: 5px;
`;

export const LoginButton = styled.button`
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
`;

export const StyledGoogleLogo = styled(GoogleLogo)`
  margin-right: 6px;
`;

export const StyledStackoverflowLogo = styled(StackoverflowLogo)`
  margin-top: 10px;
`;

export const StyledGoogleLoginText = styled.div`
  margin-top: 3px;
`;

export const BottomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;
  font-size: 12px;
`;

export const DontHaveAccount = styled.div``;

export const AreyouanEmployer = styled.div``;

export const SignupLink = styled.a`
  color: #0091ff;
  text-decoration: none;
`;

export const SignuponTalentLink = styled.a`
  color: #0091ff;
`;
