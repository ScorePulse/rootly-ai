import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <header className="bg-purple-700 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link to="/home">Rootly</Link>
        </h1>
        {currentUser && (
          <>
            <nav className="hidden md:flex space-x-4">
              <Link to="/home" className="hover:underline">
                Home
              </Link>
              <Link to="/schedule" className="hover:underline">
                Schedule
              </Link>
              <Link to="/plan" className="hover:underline">
                Plan
              </Link>
              <Link to="/students" className="hover:underline">
                Students
              </Link>
              <Link to="/setting" className="hover:underline">
                Settings
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
              </button>
            </div>
          </>
        )}
      </div>
      {isOpen && currentUser && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/home"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/schedule"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Schedule
            </Link>
            <Link
              to="/plan"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Plan
            </Link>
            <Link
              to="/students"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Students
            </Link>
            <Link
              to="/setting"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="hover:underline text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
