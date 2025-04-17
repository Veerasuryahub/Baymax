import React, { useState, useEffect, useRef } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import axios from "axios";
import { sendMessageToOpenRouter } from "../api/openRouter";


function HomePage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const chatEndRef = useRef(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
const [editedName, setEditedName] = useState("");

const handleRenameSession = (id, newName) => {
  const updatedSessions = sessions.map((session) =>
    session.id === id ? { ...session, name: newName } : session
  );
  setSessions(updatedSessions);
  localStorage.setItem("baymax_sessions", JSON.stringify(updatedSessions));
  setEditingSessionId(null);
};


  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem("baymax_sessions")) || [];
    setSessions(savedSessions);

    if (savedSessions.length > 0) {
      setChat(savedSessions[0].messages);
      setActiveSessionId(savedSessions[0].id);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  const saveSession = (updatedMessages) => {
    const sessionId = activeSessionId || Date.now();
    const newSession = {
      id: sessionId,
      name: `Chat ${new Date().toLocaleString()}`,
      messages: updatedMessages,
    };

    let updatedSessions = sessions.filter((s) => s.id !== sessionId);
    updatedSessions.unshift(newSession);

    setSessions(updatedSessions);
    setActiveSessionId(sessionId);
    localStorage.setItem("baymax_sessions", JSON.stringify(updatedSessions));
  };

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };
      const updatedChat = [...chat, userMessage];
      setChat(updatedChat);
      setMessage("");
  
      try {
        const botReply = await sendMessageToOpenRouter(message);
        const updatedChatWithBot = [...updatedChat, { text: botReply, sender: "bot" }];
        setChat(updatedChatWithBot);
        saveSession(updatedChatWithBot); // Save session here
        speak(botReply);
      } catch {
        const errorReply = { text: "Something went wrong.", sender: "bot" };
        const updatedChatWithError = [...updatedChat, errorReply];
        setChat(updatedChatWithError);
        saveSession(updatedChatWithError); // Save even on error
      }
    }
  };
 
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
  
    // Optional: Choose a voice if available
    const voices = window.speechSynthesis.getVoices();
    const baymaxVoice = voices.find((v) =>
      v.name.toLowerCase().includes("google us english") ||
      v.name.toLowerCase().includes("english")
    );
    if (baymaxVoice) {
      utterance.voice = baymaxVoice;
    }
  
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
  };
  

  
  

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setTimeout(() => handleSend(), 300);
    };
    recognition.start();
  };

  const handleSessionClick = (session) => {
    setChat(session.messages);
    setActiveSessionId(session.id);
  };

  const handleDeleteSession = (id) => {
    const updatedSessions = sessions.filter((s) => s.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem("baymax_sessions", JSON.stringify(updatedSessions));

    if (id === activeSessionId) {
      setChat([]);
      setActiveSessionId(null);
    }
  };

  const handleNewChat = () => {
    setChat([]);
    setMessage("");
    setActiveSessionId(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r hidden md:block">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">💬 Chats</h2>
          <button
            onClick={handleNewChat}
            className="text-red-600 hover:text-red-800 p-1"
            title="New Chat"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto max-h-[80vh]">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex justify-between items-center px-2 py-1 rounded-md ${
                session.id === activeSessionId ? "bg-red-100" : "hover:bg-gray-100"
              }`}
            >
              
              {editingSessionId === session.id ? (
  <input
    type="text"
    className="text-sm border border-red-300 rounded px-1 flex-1"
    value={editedName}
    autoFocus
    onChange={(e) => setEditedName(e.target.value)}
    onBlur={() => handleRenameSession(session.id, editedName)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleRenameSession(session.id, editedName);
      }
    }}
  />
) : (
  <button
    onClick={() => handleSessionClick(session)}
    onDoubleClick={() => {
      setEditingSessionId(session.id);
      setEditedName(session.name);
    }}
    className="text-left flex-1 text-sm text-gray-800"
    title="Double click to rename"
  >
    {session.name}
  </button>
)}

              <button
                onClick={() => handleDeleteSession(session.id)}
                className="text-red-400 hover:text-red-600"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Section */}
      <div
        className="flex-1 min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url('/R.jpg')` }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl p-6 flex flex-col space-y-4">
            <h1 className="text-3xl font-extrabold text-red-600 text-center">
              BAYMAX Health Assistant 💬
            </h1>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto max-h-[60vh] px-2 space-y-3 scrollbar-thin scrollbar-thumb-red-200">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end space-x-3 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <img src="/baymax.png" alt="Baymax" className="w-8 h-8 rounded-full" />
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[75%] text-sm sm:text-base ${
                      msg.sender === "user"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <img src="/user.png" alt="User" className="w-8 h-8 rounded-full" />
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <img src="/baymax.png" alt="Baymax" className="w-8 h-8 rounded-full" />
                  <div className="bg-gray-200 p-2 rounded-lg animate-pulse">Baymax is typing...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-auto">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type or speak your symptoms..."
                rows={2}
                className="flex-1 border border-gray-300 rounded-md p-3 resize-none"
              />
              <button
                onClick={handleSend}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
              >
                Send
              </button>
              <button
                onClick={handleVoiceInput}
                className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition w-full sm:w-auto"
              >
                🎤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
