import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can validate here before navigating
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `url("src/assets/OnVZ.gif")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 p-8 rounded-xl shadow-xl w-full max-w-md backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"} to BAYMAX
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-md"
        />
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-3 border rounded-md"
          />
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-red-500 text-white p-3 rounded-md"
        >
          {isSignIn ? "Login" : "Register"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-700">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-red-500 cursor-pointer font-semibold"
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
