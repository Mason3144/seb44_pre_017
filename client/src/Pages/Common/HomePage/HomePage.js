import * as S from './HomePage.styled';

import htmlLogo from '../../../Assets/html.png';
import cssLogo from '../../../Assets/css.png';
import jsLogo from '../../../Assets/js.png';
import reactLogo from '../../../Assets/react.png';
import styledLogo from '../../../Assets/styled.png';
import javaLogo from '../../../Assets/java.png';
import springLogo from '../../../Assets/spring.png';
import springbootLogo from '../../../Assets/springboot.png';
import springsecurityLogo from '../../../Assets/springsecurity.png';
import awsLogo from '../../../Assets/aws.png';
import springdataLogo from '../../../Assets/springdata.png';

import kyh from '../../../Assets/kyh.png';
import sis from '../../../Assets/sis.png';
import ahj from '../../../Assets/ahj.png';
import lts from '../../../Assets/lts.png';
import jdw from '../../../Assets/jdw.png';
import hhj from '../../../Assets/hhj.png';

const HomePage = () => {
  return (
    <S.HomeContainer>
      <S.GreetingContainer>
        <S.GreetingText>
          Welcome to
          <div>Synergyoverflow</div>
        </S.GreetingText>
      </S.GreetingContainer>
      <S.Team>
        <S.TeamTitle>Team SYNERGY</S.TeamTitle>
        <S.ImgContainer>
          <S.FE>
            <S.MemberContainer>
              <S.MemberImg src={kyh} alt="member" />
              <S.MemberName>FE 강예현</S.MemberName>
            </S.MemberContainer>
            <S.MemberContainer>
              <S.MemberImg src={ahj} alt="member" />
              <S.MemberName>FE 안현지</S.MemberName>
            </S.MemberContainer>
            <S.MemberContainer>
              <S.MemberImg src={jdw} alt="member" />
              <S.MemberName>FE 주동우</S.MemberName>
            </S.MemberContainer>
          </S.FE>
          <S.BE>
            <S.MemberContainer>
              <S.MemberImg src={sis} alt="member" />
              <S.MemberName>BE 신이수</S.MemberName>
            </S.MemberContainer>
            <S.MemberContainer>
              <S.MemberImg src={lts} alt="member" />
              <S.MemberName>BE 이태섭</S.MemberName>
            </S.MemberContainer>
            <S.MemberContainer>
              <S.MemberImg src={hhj} alt="member" />
              <S.MemberName>BE 황호준</S.MemberName>
            </S.MemberContainer>
          </S.BE>
        </S.ImgContainer>
      </S.Team>
      <S.Stack>
        <S.Front>
          <S.Logo src={htmlLogo} alt="html_logo" />
          <S.Logo src={cssLogo} alt="css_logo" />
          <S.Logo src={jsLogo} alt="css_logo" />
          <S.Logo src={reactLogo} alt="css_logo" />
          <S.Logo src={styledLogo} alt="styledcomponents_logo" />
        </S.Front>
        <S.Back>
          <S.Logo src={javaLogo} alt="java_logo" />
          <S.Logo src={springLogo} alt="spring_logo" />
          <S.Logo src={springbootLogo} alt="springboot_logo" />
          <S.Logo src={springsecurityLogo} alt="springsecurity_logo" />
          <S.Logo src={awsLogo} alt="aws_logo" />
          <S.Logo src={springdataLogo} alt="springdatajpa_logo" />
        </S.Back>
      </S.Stack>
    </S.HomeContainer>
  );
};
export default HomePage;
