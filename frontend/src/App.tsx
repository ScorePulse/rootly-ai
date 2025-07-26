import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
