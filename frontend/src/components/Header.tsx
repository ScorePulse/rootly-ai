import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-purple-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link to="/">Rootly</Link>
        </h1>
        <nav className="hidden md:flex space-x-4">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/teachers" className="hover:underline">
            Teachers
          </Link>
          <Link to="/students" className="hover:underline">
            Students
          </Link>
          <button onClick={logout} className="hover:underline">
            Logout
          </button>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
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
              to="/teachers"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Teachers
            </Link>
            <Link
              to="/students"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Students
            </Link>
            <button
              onClick={() => {
                logout();
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
