import { styled } from 'styled-components';

export const PageGroup = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const PageBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PageTitle = styled.h1`
  font-size: 30px;
  margin-left: 20px;
`;

export const TipTitle = styled.h2`
  font-weight: 400;
  margin-bottom: 2px;
`;

export const TipsBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ebf4fb;
  border: solid 1px #a6ceed;
  padding: 8px 25px;
  width: 100%;
  border-radius: 4px;
`;

export const Tipguide = styled.p`
  margin-bottom: 3px;
`;

export const TipsStep = styled.h5`
  margin-bottom: 1px;
`;

export const TitleBox = styled.div`
  border: solid 1px lightgray;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
`;

export const TitleBanner = styled.h4`
  margin-top: 3px;
  margin-bottom: 1px;
`;

export const TitleNote = styled.p`
  margin-top: 1px;
  font-size: smaller;
`;

export const InputBox = styled.input`
  padding: 4px;
`;

export const BodyBox = styled.div`
  border: solid 1px lightgray;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 470px;
  border-radius: 4px;
`;

export const BodyBanner = styled.h4`
  margin-top: 3px;
  margin-bottom: 1px;
`;

export const BodyNote = styled.p`
  margin-top: 1px;
  font-size: smaller;
`;

export const SubmitBtn = styled.button`
  background-color: #0995ff;
  border: solid 1px white;
  border-radius: 4px;
  padding: 13px;
  color: white;
`;
