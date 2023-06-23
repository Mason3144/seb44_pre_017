import styled from 'styled-components';

export const HomeContainer = styled.div``;

export const GreetingText = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  line-height: 1.7em;
  > div {
    color: #e27b32;
    font-size: 90px;
    margin-top: 30px;
  }
`;

export const GreetingContainer = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b3f43;
  color: #f8f9f9;
`;
export const Team = styled.div`
  height: 500px;
  background-color: #f8f9f9;
  letter-spacing: 20px;
`;
export const TeamTitle = styled.h1`
  text-align: center;
  font-size: 40px;
  padding-top: 30px;
  letter-spacing: 20px;
  color: #3b3f43;
`;
export const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
  gap: 30px;
`;
export const FE = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;
export const BE = styled(FE)``;
export const MemberContainer = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const MemberImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;
export const MemberName = styled.div`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #333;
`;
export const Stack = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b3f43;
  color: #000000;
  flex-direction: column;
  gap: 25px;
`;

export const Front = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  background-color: #fff;
  width: 50%;
  height: 40%;
  padding-right: 14px;
  border-radius: 30px;
  box-shadow: 5px 5px 5px black;
`;
export const Back = styled(Front)`
  gap: 10px;
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
`;

export const Logo = styled.img`
  height: 100px;
  width: 100px;
`;
