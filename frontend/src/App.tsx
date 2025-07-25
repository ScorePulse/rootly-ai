import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/students" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
