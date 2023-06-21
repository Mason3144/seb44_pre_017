import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  left: ${({ open }) => (open ? '0' : '-100%')};
  width: 300px;
  padding-left: 100px;
  height: 100vh;
  transition: left 0.3s ease-in-out;
`;
export const Home = styled.div`
  margin-top: 40px;
  font-size: 15px;
  font-weight: ${(props) => (props.active ? '700' : '')};
  color: ${(props) => (props.active ? '#000000' : '#737980')};
  background-color: ${(props) => (props.active ? '#eeeff1' : '#ffffff')};
  border-right: ${(props) => (props.active ? '3px solid #e5883e' : 'none')};
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;
export const Public = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #858c94;
`;
export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 15px;
  color: #737980;
  width: 100%;
`;

export const Questions = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
  font-weight: ${(props) => (props.active ? '700' : '')};
  color: ${(props) => (props.active ? '#000000' : '#737980')};
  background-color: ${(props) => (props.active ? '#eeeff1' : '#ffffff')};
  border-right: ${(props) => (props.active ? '3px solid #e5883e' : 'none')};
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;
export const Tags = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
`;
export const Users = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
`;
export const Companies = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
`;
export const Empty = styled.div`
  width: 15px;
  height: 15px;
`;
