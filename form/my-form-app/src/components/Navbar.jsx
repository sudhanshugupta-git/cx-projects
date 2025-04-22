import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Outlet } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
        <h1 className="text-lg font-bold">Form Creator</h1>

        {isLoggedIn ? (
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                navigate("/");
              }}
              className="text-red-500 underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-500 underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-500 underline"
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
