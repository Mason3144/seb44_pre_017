/* eslint-disable no-undef */
import './App.css';
import MyPage from './Pages/My/MyPage.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginSignup/LoginPage.jsx';
import MyPage from './Pages/My/MyPage.jsx';

function App() {
  return (
    <div className="App">
      <ProfileSidebar />
      {/* <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<div>HomePage 홈 팀원소개</div>} />
          <Route path="/members" element={<div>SignupPage 회원가입</div>} />
          <Route
            path="/members/welcome"
            element={<div>AfterSignupPage 회원가입 완료</div>}
          />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/questions"
            element={<div>MainPage Top Questions 페이지</div>}
          />
          <Route
            path="/questions/board"
            element={<div>QuestionsPage All Questions</div>}
          />
          <Route
            path="/questions/ask"
            element={<div>QuestionCreatePage 질문 생성 페이지</div>}
          />
          <Route
            path="/questions/:questionId"
            element={<div>QuestionDetailPage 질문 상세 페이지</div>}
          />
          <Route
            path="/questions/{question-id}/update"
            element={<div>QuestionUpdatePage 질문 수정 페이지</div>}
          />
          <Route
            path="/questions/{question-id}/answers"
            element={<div>AnswerUpdatePage 답변 수정 페이지</div>}
          />
          <Route path="/members/" element={<MyPage />} />
          <Route
            path="/members/delete"
            element={<div>ProfileDelete 회원정보 삭제</div>}
          />
          <Route
            path="/members/yourlogin"
            element={<div>ProfileYourlogins My Logins</div>}
          />
          <Route
            path="/members/{member-id}/yourlogin/change-password"
            element={<div>MyPage 비밀번호 변경</div>}
          />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
