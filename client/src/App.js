/* eslint-disable no-undef */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Common/HomePage/HomePage';
import Header from './Components/Common/Header/Header';
import AnswerUpdatePage from './Pages/Question/AnswerUpdatePage/AnswerUpdatePage';
import QuestionUpdatePage from './Pages/Question/QuestionUpdate.js/QuestionUpdatePage';
import MainPage from './Pages/Common/MainPage/MainPage';
import Sidebar from './Components/Common/Sidebar/Sidebar';
import Footer from './Components/Common/Footer/Footer';
import QuestionDetail from './Pages/Question/QuestionDetail/QuestionDetail';
import MyPage from './Pages/My/MyPage.jsx';
import PasswordUpdatePage from './Pages/My/PasswordUpdatePage.jsx';
import LoginPage from './Pages/LoginSignup/LoginPage.jsx';
import QuestionCreatePage from './Pages/Question/QuestionCreatePage/QuestionCreatePage';
import QuestionPage from './Pages/Question/QuestionPage/QuestionPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<div>SignupPage 회원가입</div>} />
          <Route
            path="/members/welcome"
            element={<div>AfterSignupPage 회원가입 완료</div>}
          />
          <Route path="/questions" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/questions/board" element={<QuestionPage />} />
          <Route path="/questions/ask" element={<QuestionCreatePage />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route
            path="/questions/:questionId/update"
            element={<QuestionUpdatePage />}
          />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route
            path="/questions/:questionId/update"
            element={<QuestionUpdatePage />}
          />
          <Route
            path="/questions/:questionId/answers/:answerId/edit"
            element={<AnswerUpdatePage />}
          />
          <Route path="/members/" element={<MyPage />} />
          <Route
            path="/members/{memberId}/delete"
            element={<div>ProfileDelete 회원정보 삭제</div>}
          />
          <Route
            path="/members/{memberId}/yourlogin"
            element={<div>ProfileYourlogins My Logins</div>}
          />
          <Route
            path="/members/{memberId}/yourlogin/change-password"
            element={<PasswordUpdatePage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
