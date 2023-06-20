import * as S from './Footer.styled';
import logo from '../../../icons/logo.png';
function Footer() {
  return (
    <S.FooterContainer>
      <S.Center>
        <S.Logo>
          <img src={logo} alt="logo" />
        </S.Logo>
        <S.Team>
          <S.Title>TEAM</S.Title>
          <S.Content>Synergy</S.Content>
        </S.Team>
        <S.PreProject>
          <S.Title>PRE-PROJECT</S.Title>
          <S.Content>Stckoverflow Clone Coding</S.Content>
        </S.PreProject>
        <S.Stack>
          <S.Title>STACK</S.Title>
          <S.Content>
            <S.Frontend>
              HTML
              <br />
              CSS
              <br />
              JavaScript
              <br />
              React
              <br />
              Styled-Components
            </S.Frontend>
            <S.Backend>
              java
              <br />
              spring
              <br />
              spring boot
              <br />
              spring security
              <br />
              aws
              <br />
              spring data jpa
            </S.Backend>
          </S.Content>
        </S.Stack>
        <S.Member>
          <S.Title>MEMBER</S.Title>
          <S.Content>
            강예현
            <br />
            신이수
            <br />
            안현지
            <br />
            이태섭
            <br />
            주동우
            <br />
            황호준
            <br />
          </S.Content>
        </S.Member>
      </S.Center>
      <S.Copyright>Copyright &copy; 2023 SynergyOverflow</S.Copyright>
    </S.FooterContainer>
  );
}
export default Footer;
