import styled from 'styled-components';

export const MyLoginsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 20px;
  width: 742px;
  height: 524px;
`;

export const TitleWrapper = styled.div`
  border-bottom: 1px solid lightgray;
  width: 683px;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Text = styled.p`
  font-size: 16px;
  padding-bottom: 10px;
`;

export const SubTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid lightgray;
  width: 683px;
  height: 100px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export const Button = styled.button`
  width: 110px;
  height: 30px;
  font-size: 10px;
  font-weight: 100;
  border-radius: 5px;
  background-color: ${(props) =>
    props.buttontype === 'changepassword' ? 'white' : '#99c0df76'};
  color: ${(props) =>
    props.buttontype === 'changepassword' ? '#0091FF' : '#006eff'};
  border: ${(props) =>
    props.buttontype === 'changepassword'
      ? '1px solid #0091FF'
      : '1px solid #006eff'};
`;

export const RemoveButton = styled.button`
  width: 70px;
  height: 30px;
  font-size: 10px;
  font-weight: 100;
  border-radius: 5px;
  background-color: #ffffff;
  color: #ff0000;
  border: 1px solid #ff0000;
`;
