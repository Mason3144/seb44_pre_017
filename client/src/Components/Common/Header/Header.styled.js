import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0%;
  z-index: 1;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3.5px solid #e5883e;
  border-bottom: 1px solid #dddddd;
`;
export const MenuBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    background-color: #e4e5e7;
  }
`;
export const TitleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    background-color: #e4e5e7;
  }
  > img {
    height: 32px;
    width: 32px;
  }
`;
export const Title = styled.div`
  display: flex;
`;
export const Synergy = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-left: 5px;
`;
export const Overflow = styled.h1`
  font-size: 24px;
  font-weight: 900;
`;
export const Products = styled.div`
  color: #545960;
  font-size: 13px;
  padding: 0 10px;
`;
export const SearchContainer = styled.div`
  width: 700px;
  background-color: #ffffff;
  border: 1.5px solid #bbbfc3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
export const SearchIcon = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`;
export const Searchbar = styled.input`
  width: 750px;
  height: 25px;
  border: none;
  margin-left: 10px;
  color: #858c94;
  &:focus {
    outline: none;
  }
`;

// 비 로그인 시 로그인 버튼 및 회원가입 버튼 표시
export const LoginBtn = styled.button`
  background-color: #e8f7ff;
  color: #1eaeff;
  border: 1.5px solid #1eaeff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #b9d2e8;
    border-color: #3172c6;
    color: #3172c6;
  }
`;
export const SignupBtn = styled.button`
  background-color: #1eaeff;
  color: #ffffff;
  border: 1.5px solid #1eaeff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #3172c6;
    border-color: #3172c6;
  }
`;

//로그인 시 프로필 이미지 표시
export const ImgContainer = styled.div`
  height: 100%;
  margin: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e4e5e7;
  }
`;

export const LogoutBtn = styled(LoginBtn)``;
