import styled from 'styled-components';
export const ItemContainer=styled.li`
list-style: none;
height: 130px;
width: 100%;
border-top: 2px solid #E4E6E8;
display: flex;

`
export const Left=styled.div`
display: flex;
flex-direction: column;
align-items: end;
justify-content: center;
gap: 10px;
margin-left: 10%;
font-size: 14px;
font-weight: 500;
`
export const Votes=styled.div`
`
export const Answers=styled.div`
`
export const Views=styled.div`
`
export const Right=styled.div`
 display: flex;
flex-direction: column;
justify-content: center;
gap:20px;
flex: 1; 
`
export const Title=styled.div`
display: flex;
margin-left: 30px;
font-size: 16px;
color: #3172C6;
font-weight: 500;
cursor: pointer;
&:hover{
    color: #4393F7 ;
}
`
export const UserInfo=styled.div`
display: flex;
justify-content: flex-end;
margin-right:50px;
gap: 10px;
font-size: 12px;
font-weight: 400;
`
export const User=styled.div`
color: #3172C6;
`
export const CreatedAt=styled.div`
`
export const Empty=styled.div``