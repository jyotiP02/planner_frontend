import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  // Auto-apply stored theme on load
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div className="flex h-screen transition duration-300">
      {/* 🌗 Theme Toggle Button */}
      <div className="absolute top-4 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="text-white bg-gray-700 px-3 py-1 rounded shadow"
        >
          🌗 Toggle Theme
        </button>
      </div>

      {/* 📸 Left Side - Image + Heading */}
      <div
        className="w-1/2 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1561488110-7cf9b3d3915a?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <h1 className="text-5xl font-bold text-white hero-text">
          Log in to join Events
        </h1>
      </div>

      {/* 🔐 Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center login-section">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 transition duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            Welcome to <span className="text-indigo-600">Event Planner</span>
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Sign Up
            </button>

            <button
              onClick={() => navigate("/admin-login")}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
