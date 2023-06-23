import * as S from './SignupPage.styled';

const AfterSignupPage = () => {
  return (
    <div className="aftersignup-page">
      <S.AfterSignupPageWrapper>
        <S.Textcontentbox>Welcome to Synergy Overflow</S.Textcontentbox>
        <S.StyledStackoverflowLogo />
        <S.IntroductionTextBox>
          Synergy Overflow is a question and answer site for proffesional and
          enthusiast programmers. It’s built and run by you as part of the Stack
          Exchange network of Q&A sites. With your help, we’re working together
          to build a library of detailed, high-quality answers to every question
          about programming.
        </S.IntroductionTextBox>
        <S.Textcontentbox>
          Ask questions, get answers, no distractions
        </S.Textcontentbox>
      </S.AfterSignupPageWrapper>
    </div>
  );
};

export default AfterSignupPage;
