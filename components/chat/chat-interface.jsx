"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaCopy, FaWhatsapp, FaEnvelope, FaSignOutAlt, FaUserCircle, FaTrash } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { logout } from "@/app/actions/auth";

// ✅ Move Header outside
const Header = ({ user, theme, toggleTheme, clearChat, handleLogout, showMenu, setShowMenu }) => {
  return (
    <div className="chat-header">
      <TbMessageChatbotFilled suppressHydrationWarning /> &nbsp;&nbsp;Study Helper
      <div className="header-right"> 
        <button onClick={clearChat} className="clear-chat"><FaTrash suppressHydrationWarning /></button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
        <div className="user-menu">
          <FaUserCircle className="user-icon" onClick={() => setShowMenu(!showMenu)} suppressHydrationWarning />
          {showMenu && (
            <div className="dropdown-menu">
              <span className="user-id">{user?.email || "No Email"}</span>
              <button onClick={handleLogout} className="dropdown-item">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`https://askdemia.onrender.com/chat/history/${user.email}`);
      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchChatHistory();
    }
  }, [user]);

  const sendMessage = async () => {
    if (!input.trim() || !user?.email) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://askdemia.onrender.com/chat", {
        user_id: user.email,
        message: input,
      });

      if (response.data && response.data.response) {
        const botMessage = { role: "bot", text: response.data.response };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Unexpected response format." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, an error occurred." }]);
    }

    setLoading(false);
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);
  const sendToWhatsApp = (text) => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  const sendToGmail = (text) => window.open(`mailto:?subject=Chat Response&body=${encodeURIComponent(text)}`);

  const clearChat = async () => {
    if (!user?.email) return;

    const confirmClear = window.confirm("Are you sure you want to delete all chat history?");
    if (!confirmClear) return;

    try {
      await axios.delete(`https://askdemia.onrender.com/chat/history/${user.email}`);
      setMessages([]);
    } catch (error) {
      console.error("Failed to delete chat history:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <Header
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        clearChat={clearChat}
        handleLogout={handleLogout}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
            <div className="message-content">
              <span className="message-sender">{msg.role === "user" ? "You" : "Bot"}:</span>
              {msg.role === "bot" ? (
                <>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  <div className="message-actions">
                    <button className="action-button" onClick={() => handleCopy(msg.text)} title="Copy">
                      <FaCopy />
                    </button>
                    <button className="action-button" onClick={() => sendToWhatsApp(msg.text)} title="Share via WhatsApp">
                      <FaWhatsapp />
                    </button>
                    <button className="action-button" onClick={() => sendToGmail(msg.text)} title="Send via Email">
                      <FaEnvelope />
                    </button>
                  </div>
                </>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {loading && <div className="loading-spinner"><div className="spinner"></div></div>}
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
};

export default Chat;
