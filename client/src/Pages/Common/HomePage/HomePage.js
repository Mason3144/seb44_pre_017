import * as S from './HomePage.styled';
const HomePage = () => {
  return (
    <S.HeaderContainer>
      <S.GreetingContainer>
        <S.GreetingText>
          Welcome to
          <div>Synergyoverflow</div>
        </S.GreetingText>
      </S.GreetingContainer>
      <S.Team>Team SYNERGY</S.Team>
      <S.Stack></S.Stack>
    </S.HeaderContainer>
  );
};
export default HomePage;
