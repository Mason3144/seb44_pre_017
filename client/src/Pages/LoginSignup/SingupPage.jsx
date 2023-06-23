import Signup from '../../Components/LoginSignup/Signup.jsx';
import * as S from './SignupPage.styled.js';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <S.SignupPageWrapper>
        <S.WelcomeContainer>
          <S.WelcomTitle>
            <strong>Join the Synergy Overflow</strong>
          </S.WelcomTitle>
          <p>Get unstuck — ask a question</p>
          <p>Unlock new privileges like voting and commenting</p>
          <p>Save your favorite questions, answers, watch tags, and more</p>
          <p>Earn reputation and badges</p>
          <S.BottomText>
            Collaborate and share knowledge with a private group for FREE.
            <br></br>
            Get Stack Overflow for Teams free for up to 50 users.
          </S.BottomText>
        </S.WelcomeContainer>
        <Signup />
      </S.SignupPageWrapper>
    </div>
  );
};

export default SignupPage;
