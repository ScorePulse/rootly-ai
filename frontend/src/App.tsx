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
import AddStudentPage from "./pages/AddStudentPage";
import Header from "./components/Header";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import SchedulePage from "./pages/SchedulePage";
import PlanPage from "./pages/PlanPage";
import PlanningPage from "./pages/PlanningPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";
import UserProfileLayout from "./pages/UserProfile/UserProfileLayout";

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
  const { currentUser, userData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Debug logging
  console.log("AppRoutes - currentUser:", currentUser?.uid);
  console.log("AppRoutes - userData:", userData);
  console.log("AppRoutes - loading:", loading);

  // Route logic based on user state:
  // 1. No currentUser -> redirect to login
  // 2. Has currentUser but no userData -> redirect to login (user doc doesn't exist)
  // 3. Has userData but isRegistered=false -> redirect to login (shouldn't happen with new flow)
  // 4. Has userData, isRegistered=true but isProfileComplete=false -> redirect to user-profile
  // 5. Has userData, isRegistered=true and isProfileComplete=true -> allow access to protected routes

  return (
    <div className="pb-16">
      {" "}
      {/* Add padding to the bottom to avoid content being hidden by the nav bar */}
      <Routes>
        <Route
          path="/login"
          element={
            currentUser &&
            userData?.isRegistered &&
            userData?.isProfileComplete ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            currentUser &&
            userData?.isRegistered &&
            userData?.isProfileComplete ? (
              <Navigate to="/home" />
            ) : currentUser &&
              userData?.isRegistered &&
              !userData?.isProfileComplete ? (
              <Navigate to="/user-profile" />
            ) : (
              <RegisterPage />
            )
          }
        />
        <Route
          path="/user-profile"
          element={
            currentUser ? (
              userData ? (
                userData.isRegistered ? (
                  userData.isProfileComplete ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <UserProfileLayout />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
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
          path="/planning"
          element={
            <ProtectedRoute>
              <PlanningPage />
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
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudentPage />
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
      {currentUser && userData?.isRegistered && userData?.isProfileComplete && (
        <BottomNav />
      )}
    </div>
  );
};

export default App;
