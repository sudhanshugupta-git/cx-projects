import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Outlet } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>Forms</h1>

        {isLoggedIn ? (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/forms")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              All Forms
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="text-red-500 underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-500 underline cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-500 underline cursor-pointer"
            >
              Signup
            </button>
          </div>
        )}

      </nav>
      <Outlet />

    </>
  );
}
