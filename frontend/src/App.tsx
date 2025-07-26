import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import Header from "./components/Header";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import SchedulePage from "./pages/SchedulePage";
import PlanPage from "./pages/PlanPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

const AppRoutes: React.FC = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-16">
      {" "}
      {/* Add padding to the bottom to avoid content being hidden by the nav bar */}
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <PlanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {currentUser && <BottomNav />}
    </div>
  );
};

export default App;
