import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { Navigate } from "react-router";
import CourseManagementPage from "./pages/CourseManagementPage";
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
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={role === "student" ? (<StudentDashboard />) : role === "instructor" ? (<InstructorDashboard />) : (<Navigate to = "/login" />)} />
          <Route path="/courses" element={<CourseManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
