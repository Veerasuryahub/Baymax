import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-500 text-white flex items-center overflow-hidden relative">

      {/* Left content */}
      <div className="flex-1 px-6 md:px-12 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hello, I'm <span className="text-white">BAYMAX</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg mb-6"
        >
          Your personal healthcare companion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex space-x-4"
        >
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-red-500 px-6 py-2 rounded-xl hover:bg-red-100 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="border border-white px-6 py-2 rounded-xl hover:bg-white hover:text-red-500 transition"
          >
            Sign Up
          </button>
        </motion.div>
      </div>

      {/* Right Image with 0 space */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-0 bottom-0 h-full"
      >
        <img
          src="src/assets/bay.png" // Replace with your correct path
          alt="Baymax"
          className="h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

export default LandingPage;
