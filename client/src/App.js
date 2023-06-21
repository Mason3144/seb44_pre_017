import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Common/Footer/Footer';
import Sidebar from './Components/Common/Sidebar/Sidebar';
import Header from './Components/Common/Header/Header';
import TopQuestions from './Components/Question/TopQuestions/TopQuestions';
import QuestionUpdatePage from './Pages/Question/QuestionUpdate.js/QuestionUpdatePage';
import MyPage from './Pages/My/MyPage';
import MyPage from './Pages/My/MyPage.jsx';
import LoginPage from './Pages/LoginSignup/LoginPage.jsx';
import QuestionCreatePage from './Pages/Question/QuestionCreatePage/QuestionCreatePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/home" element={<div>HomePage 홈 팀원소개</div>} />
          <Route path="/members" element={<div>SignupPage 회원가입</div>} />
          <Route
            path="/members/welcome"
            element={<div>AfterSignupPage 회원가입 완료</div>}
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/questions" element={<TopQuestions />} />
          <Route
            path="/questions/board"
            element={<div>QuestionsPage All Questions</div>}
          />
          <Route path="/questions/ask" element={<QuestionCreatePage />} />
          <Route
            path="/questions/:questionId"
            element={<div>QuestionDetailPage 질문 상세 페이지</div>}
          />
          <Route
            path="/questions/:questionId/update"
            element={<QuestionUpdatePage />}
          />
          <Route
            path="/questions/:questionId/answers/:answerId/edit"
            element={<div>AnswerUpdatePage 답변 수정 페이지</div>}
          />
          <Route path="/members/" element={<MyPage />} />
          <Route
            path="/members/{member-id}/delete"
            element={<div>ProfileDelete 회원정보 삭제</div>}
          />
          <Route
            path="/members/{member-id}/yourlogin"
            element={<div>ProfileYourlogins My Logins</div>}
          />
          <Route
            path="/members/{member-id}/yourlogin/change-password"
            element={<div>MyPage 비밀번호 변경</div>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
