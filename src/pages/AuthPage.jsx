import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can validate here before navigating
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url("src/assets/OnVZ.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional gradient overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="bg-white/90 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {isSignIn ? "Sign In" : "Sign Up"} to <span className="text-red-500">BAYMAX</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {!isSignIn && (
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
              <FiUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-md font-semibold tracking-wide"
        >
          {isSignIn ? "Login" : "Register"}
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
