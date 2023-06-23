/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
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
import SignupPage from './Pages/LoginSignup/SingupPage.jsx';
import AfterSignupPage from './Pages/LoginSignup/AfterSignupPage.jsx';
import {
  GoogleLoginToken,
  NoneRefreshTokenAutoLogout,
  KeepLogin,
} from './Components/LoginSignup/Login.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/oauth2/authorization/google/success/"
            element={<GoogleLoginToken />}
          />
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
          <Route path="/members/:memberId" element={<MyPage />} />
          <Route path="/members" element={<SignupPage />} />
          <Route path="/members/welcome" element={<AfterSignupPage />} />
          <Route
            path="/members/:memberId/yourlogin/change-password"
            element={<PasswordUpdatePage />}
          />
        </Routes>
        <Footer />
        <NoneRefreshTokenAutoLogout />
        <KeepLogin />
      </BrowserRouter>
    </div>
  );
}

export default App;
