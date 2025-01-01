import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import QuizManagementPage from "./pages/QuizManagementPage";
import CourseManagementPage from "./pages/CourseManagementPage";
import CourseEnrollmentPage from "./pages/CourseEnrollmentPage";
import QuizPage from "./pages/QuizPage";
import getRole from "./components/getRole";
import StudentDashboard from "./pages/StudentDashboardPage";
import InstructorDashboard from "./pages/InstructorDashboardPage";


function App() {

  const role = getRole();

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={role === "student" ? (<StudentDashboard />) : role === "instructor" ? (<InstructorDashboard />) : (<Navigate to = "/login" />)} />
          <Route path="/quizzes" element={<QuizManagementPage />} />
          <Route path="/courses" element={<CourseManagementPage />} />
          <Route path="/courses/enroll" element={<CourseEnrollmentPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
