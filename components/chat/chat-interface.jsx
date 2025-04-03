// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Chat.css"; // Importing the external CSS file for styling
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm"; // Enables tables, strikethrough, etc.

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "You", text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });

//       console.log("API Response:", response); // Debugging API response
//       console.log("Response Data:", response.data); // Checking data

//       if (response.data && response.data.response) {
//         const botMessage = { sender: "Bot", text: response.data.response };
//         setMessages((prev) => [...prev, botMessage]);
//       } else {
//         console.warn("Unexpected response format:", response.data);
//         setMessages((prev) => [...prev, { sender: "Bot", text: "Unexpected response format." }]);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [...prev, { sender: "Bot", text: "Sorry, an error occurred." }]);
//     }

//     setInput("");
//   };

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <TbMessageChatbotFilled /> &nbsp;&nbsp;Study Helper
//       </div>
//       <div className="messages-container">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === "You" ? "user-message" : "bot-message"}`}>
//           <div className="message-content">
//             <span className="message-sender">{msg.sender}:</span>
//             {msg.sender === "Bot" ? (
//               <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
//             ) : (
//               <span>{msg.text}</span>
//             )}
//           </div>
//         </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-input-area">
//         <input
//           type="text"
//           className="chat-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage} className="send-button">
//           &nbsp;➤
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./Chat.css";
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import { FaCopy, FaWhatsapp, FaEnvelope, FaTrash } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);
//   const handleSendMessage = () => {
//     if (input.trim()) {
//       sendMessage(input);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "You", text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });

//       if (response.data && response.data.response) {
//         const botMessage = { sender: "Bot", text: response.data.response };
//         setMessages((prev) => [...prev, botMessage]);
//       } else {
//         setMessages((prev) => [...prev, { sender: "Bot", text: "Unexpected response format." }]);
//       }
//     } catch {
//       setMessages((prev) => [...prev, { sender: "Bot", text: "Sorry, an error occurred." }]);
//     }

//     setInput("");
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied to clipboard!");
//   };

//   const sendToWhatsApp = (text) => {
//     window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
//   };

//   const sendToGmail = (text) => {
//     const subject="Chat With AI";
//     window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${text}`, "_blank")
//     // window.open(`mailto:?subject=Chat Response&body=${encodeURIComponent(text)}`);
//   };

//   const clearConversation = () => {
//     setMessages([]);
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <TbMessageChatbotFilled /> &nbsp;&nbsp;Study Helper
//         <button className="clear-btn" onClick={clearConversation}><FaTrash /></button>
//       </div>
//       <div className="messages-container">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === "You" ? "user-message" : "bot-message"}`}>
//             <div className="message-content">
//               <span className="message-sender">{msg.sender}:</span>
//               {msg.sender === "Bot" ? (
//                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
//               ) : (
//                 <span>{msg.text}</span>
//               )}
//               {msg.sender === "Bot" && (
//                 <div className="message-actions">
//                   <button onClick={() => copyToClipboard(msg.text)}><FaCopy /></button>
//                   <button onClick={() => sendToWhatsApp(msg.text)}><FaWhatsapp /></button>
//                   <button onClick={() => sendToGmail(msg.text)}><FaEnvelope /></button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-input-area">
//         <input
//           type="text"
//           className="chat-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage} className="send-button">➤</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import { TbMessageChatbotFilled } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaCopy, FaWhatsapp, FaEnvelope, FaSignOutAlt, FaUserCircle, FaTrash } from "react-icons/fa";
import { logout } from "@/app/actions/auth"; // Import logout function

const Chat = ({user}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });

      if (response.data && response.data.response) {
        const botMessage = { sender: "Bot", text: response.data.response };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [...prev, { sender: "Bot", text: "Unexpected response format." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "Bot", text: "Sorry, an error occurred." }]);
    }
    
    setLoading(false);
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);
  const sendToWhatsApp = (text) => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  const sendToGmail = (text) => window.open(`mailto:?subject=Chat Response&body=${encodeURIComponent(text)}`);
  const clearChat = () => setMessages([]);

  const handleLogout = async () => {
    await logout(); // Call the logout function
    window.location.href = "/"; // Redirect to the homepage
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <TbMessageChatbotFilled /> &nbsp;&nbsp;Study Helper
        <div className="header-right">
          <button onClick={clearChat} className="clear-chat"><FaTrash /></button>
          <div className="user-menu">
            <FaUserCircle className="user-icon" onClick={() => setShowMenu(!showMenu)} />
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
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user-message" : "bot-message"}`}>
            <div className="message-content">
              <span className="message-sender">{msg.sender}:</span>
              {msg.sender === "Bot" ? (
                <>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  <div className="message-actions">
                    <FaCopy onClick={() => handleCopy(msg.text)} />
                    <FaWhatsapp onClick={() => sendToWhatsApp(msg.text)} />
                    <FaEnvelope onClick={() => sendToGmail(msg.text)} />
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


// "use client"

// import React, { useState, useRef, useEffect } from "react"
// import { useChat } from "ai/react"
// import { useRouter } from "next/navigation"
// import { useTheme } from "@/context/theme-context"
// import Box from "@mui/material/Box"
// import Paper from "@mui/material/Paper"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"
// import IconButton from "@mui/material/IconButton"
// import Typography from "@mui/material/Typography"
// import AppBar from "@mui/material/AppBar"
// import Toolbar from "@mui/material/Toolbar"
// import Avatar from "@mui/material/Avatar"
// import Menu from "@mui/material/Menu"
// import MenuItem from "@mui/material/MenuItem"
// import Tooltip from "@mui/material/Tooltip"
// import Card from "@mui/material/Card"
// import CardContent from "@mui/material/CardContent"
// import CircularProgress from "@mui/material/CircularProgress"
// import Dialog from "@mui/material/Dialog"
// import DialogActions from "@mui/material/DialogActions"
// import DialogContent from "@mui/material/DialogContent"
// import DialogContentText from "@mui/material/DialogContentText"
// import DialogTitle from "@mui/material/DialogTitle"
// import { logout } from "@/app/actions/auth"

// // Icons
// import SendIcon from "@mui/icons-material/Send"
// import DarkModeIcon from "@mui/icons-material/DarkMode"
// import LightModeIcon from "@mui/icons-material/LightMode"
// import ContentCopyIcon from "@mui/icons-material/ContentCopy"
// import EmailIcon from "@mui/icons-material/Email"
// import WhatsAppIcon from "@mui/icons-material/WhatsApp"
// import DeleteIcon from "@mui/icons-material/Delete"
// import PersonIcon from "@mui/icons-material/Person"

// export default function ChatInterface({ user }) {
//   const router = useRouter()
//   const { theme, toggleTheme } = useTheme()
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [clearDialogOpen, setClearDialogOpen] = useState(false)
//   const messagesEndRef = useRef(null)
//   const inputRef = useRef(null)

//   const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
//     api: "/api/chat",
//     onResponse: async (response) => {
//       const data = await response.json();
//       console.log("Chat API response:", data);

//       if (data.content) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id: Date.now(), role: "assistant", content: data.content }
//         ]);
//       }
//     },
//   });


//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // Auto-expand textarea as user types
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.style.height = "auto"
//       inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
//     }
//   }, [input])

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = async () => {
//     handleMenuClose()
//     await logout()
//     router.push("/")
//     router.refresh()
//   }

//   const handleClearChat = () => {
//     setClearDialogOpen(false)
//     setMessages([])
//   }

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//   }

//   const shareViaGmail = (text) => {
//     const subject = encodeURIComponent("Chat with AI")
//     const body = encodeURIComponent(text)
//     window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank")
//   }

//   const shareViaWhatsApp = (text) => {
//     const encodedText = encodeURIComponent(text)
//     window.open(`https://wa.me/?text=${encodedText}`, "_blank")
//   }

//   const handleFormSubmit = (e) => {
//     e.preventDefault()
//     if (input.trim()) {
//       handleSubmit(e)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         bgcolor: theme === "dark" ? "grey.900" : "grey.50",
//       }}
//     >
//       <AppBar position="static" color="default">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             AI Chatbot
//           </Typography>

//           <IconButton color="inherit" onClick={toggleTheme}>
//             {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
//           </IconButton>

//           <IconButton color="inherit" onClick={() => setClearDialogOpen(true)}>
//             <DeleteIcon />
//           </IconButton>

//           <Tooltip title="Account settings">
//             <IconButton onClick={handleMenuOpen} color="inherit">
//               <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
//                 <PersonIcon />
//               </Avatar>
//             </IconButton>
//           </Tooltip>

//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem disabled>
//               <Typography variant="body2">{user.email}</Typography>
//             </MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Box
//         sx={{
//           flexGrow: 1,
//           p: 2,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           overflowY: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: "auto", // Ensures scrolling happens only inside this box
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//         {messages.map((message) => (
//           <Card
//             key={message.id}
//             sx={{
//               maxWidth: "75%",
//               alignSelf: message.role === "user" ? "flex-end" : "flex-start",
//               bgcolor:
//                 message.role === "user"
//                   ? theme === "dark"
//                     ? "primary.dark"
//                     : "primary.light"
//                   : theme === "dark"
//                     ? "grey.800"
//                     : "grey.100",
//               color:
//                 message.role === "user"
//                   ? theme === "dark"
//                     ? "primary.contrastText"
//                     : "primary.contrastText"
//                   : theme === "dark"
//                     ? "white"
//                     : "text.primary",
//               borderRadius: message.role === "user" ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
//               animation: "fadeIn 0.3s ease-in-out",
//               "@keyframes fadeIn": {
//                 "0%": {
//                   opacity: 0,
//                   transform: "translateY(10px)",
//                 },
//                 "100%": {
//                   opacity: 1,
//                   transform: "translateY(0)",
//                 },
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="body1" component="div" sx={{ whiteSpace: "pre-wrap" }}>
//                 {message.content}
//               </Typography>

//               {message.role === "assistant" && (
//                 <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 1 }}>
//                   <Tooltip title="Copy to clipboard">
//                     <IconButton size="small" onClick={() => copyToClipboard(message.content)}>
//                       <ContentCopyIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Share via Gmail">
//                     <IconButton size="small" onClick={() => shareViaGmail(message.content)}>
//                       <EmailIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Share via WhatsApp">
//                     <IconButton size="small" onClick={() => shareViaWhatsApp(message.content)}>
//                       <WhatsAppIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
//         ))}

//         {isLoading && (
//           <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//             <CircularProgress size={24} />
//           </Box>
//         )}

//         <div ref={messagesEndRef} />
//         </Box>       
//       </Box>

//       <Paper
//         component="form"
//         onSubmit={handleFormSubmit}
//         sx={{
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           borderTop: 1,
//           borderColor: "divider",
//           bgcolor: theme === "dark" ? "grey.800" : "background.paper",
//         }}
//         elevation={3}
//       >
//         <TextField
//           fullWidth
//           multiline
//           maxRows={4}
//           placeholder="Type a message..."
//           value={input}
//           onChange={handleInputChange}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault()
//               if (input.trim()) {
//                 handleSubmit(e)
//               }
//             }
//           }}
//           inputRef={inputRef}
//           variant="outlined"
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 4,
//             },
//           }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           disabled={isLoading || !input.trim()}
//           endIcon={<SendIcon />}
//           sx={{ borderRadius: 4, px: 3 }}
//         >
//           Send
//         </Button>
//       </Paper>

//       <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
//         <DialogTitle>Clear Chat History</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to clear all chat messages? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleClearChat} color="error" autoFocus>
//             Clear
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }