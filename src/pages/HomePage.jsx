import React, { useState } from "react";

function HomePage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, { text: message, sender: "user" }]);
      setMessage("");

      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            text: "I'm Baymax, your healthcare assistant. How can I help you?",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/R.jpg')` }}>
      <div className="absolute inset-0 bg-white/40 backdrop-md"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl shadow-xl rounded-xl p-6 flex flex-col">
          <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">
            BAYMAX Chat
          </h1>

          {/* Chat Box */}
          <div className="flex-1 overflow-y-auto max-h-[60vh] mb-4 px-1 space-y-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-red-500 text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2 mt-auto">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type or speak your symptoms..."
              rows={2}
              className="flex-1 border border-gray-300 rounded-md p-3 resize-none"
            />
            <button
              onClick={handleSend}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Send
            </button>
            <button
              onClick={handleVoiceInput}
              className="bg-white text-red-500 border border-red-500 px-3 py-2 rounded-md hover:bg-red-100 transition"
            >
              🎤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;