import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import QuizManagementPage from "./pages/QuizManagementPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import CourseEnrollmentPage from "./pages/CourseEnrollmentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quizzes" element={<QuizManagementPage />} />
        <Route path="/courses" element={<CourseManagementPage />} />
        <Route path="/courses/enroll" element={<CourseEnrollmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
