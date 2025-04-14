"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaCopy, FaWhatsapp, FaEnvelope, FaSignOutAlt, FaUserCircle, FaTrash } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { logout } from "@/app/actions/auth";
import { HiOutlineLightBulb } from "react-icons/hi";

// ✅ Move Header outside
const Header = ({ user, theme, toggleTheme, clearChat, handleLogout, showMenu, setShowMenu }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  return (
    <div className="chat-header">
      <div className="header-left">
        <HiOutlineLightBulb className="logo" /><span className="logo-name">Askdemia</span>
      </div>
      <div className="header-right">
        <button onClick={clearChat} className="clear-chat"><FaTrash suppressHydrationWarning /></button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "dark" ? "🌙" : "🌞"}
        </button>
        <div className="user-menu" ref={menuRef}>
          <FaUserCircle className="user-icon" onClick={() => setShowMenu(!showMenu)} suppressHydrationWarning />
          {showMenu && (
            <div className="dropdown-menu">
              <span className="user-id">{user?.email || "No Email"}</span>

              <hr />
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
  const sendToGmail = (text) => {
    const subject = encodeURIComponent("chatAI");
    const body = encodeURIComponent(text);

    const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&to=&su=${subject}&body=${body}&tf=cm`;

    window.open(gmailUrl, "_blank");
  };


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
          <div
            key={index}
            className={`message ${msg.role === "user"
                ? `user-message ${messages.findIndex(m => m.role === "user") === index ? "first-user-message" : ""}`
                : "bot-message"
              }`}
          >
            <div className="message-content">
              <span className="message-sender">{msg.role === "user" ? "You" : "Bot"}:</span>
              {msg.role === "bot" ? (
                <>
                  {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                   */}
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p>{children}</p>,
                        a: ({ href, children }) => (
                          <a href={href} style={{ color: '#6cf', textDecoration: 'underline' }}>{children}</a>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        code: ({ inline, children }) =>
                          inline ? (
                            <code style={{ backgroundColor: '#333', padding: '2px 6px', borderRadius: '4px' }}>{children}</code>
                          ) : (
                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                              <pre style={{ backgroundColor: 'var(--background)', padding: '12px', borderRadius: '6px', overflowX: 'auto' }}>
                                <code>{children}</code>
                              </pre>
                              <div style={{ position: 'absolute', top: 6, right: 8, display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => handleCopy(children)}
                                  title="Copy"
                                  className="action-button"
                                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  <FaCopy />
                                </button>
                                <button
                                  onClick={() => sendToWhatsApp(children)}
                                  title="Share via WhatsApp"
                                  className="action-button"
                                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  <FaWhatsapp />
                                </button>
                                <button
                                  onClick={() => sendToGmail(children)}
                                  title="Send via Email"
                                  className="action-button"
                                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                  <FaEnvelope />
                                </button>
                                <br />
                                <br />
                              </div>
                            </div>
                          ),
                        table: ({ children }) => <table>{children}</table>,
                        thead: ({ children }) => <thead>{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr>{children}</tr>,
                        th: ({ children }) => <th>{children}</th>,
                        td: ({ children }) => <td>{children}</td>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>

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
      <div className={`chat-input-area ${messages.length === 0 ? "no-messages" : "with-messages"}`}>
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
