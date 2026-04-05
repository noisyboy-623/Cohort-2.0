/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const chat = useChat();
  
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const scrollRef = useRef(null);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    // Initialize with an empty first chat
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [selectedChatId, chats]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toLocaleString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
  };

  const getCurrentChat = () => {
    return chats.find((c) => c.id === selectedChatId);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (!chatInput.trim()) return;

    // const currentChat = getCurrentChat();
    // if (!currentChat) return;
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
    });

    // Add user message
    // const newMessage = { type: "user", text: inputValue };
    // const updatedChats = chats[currentChatId]?.messages.map((c) =>
    //   c.id === selectedChatId
    //     ? { ...c, messages: [...c.messages, newMessage] }
    //     : c,
    // );

    // setChats(updatedChats);
    setChatInput("");
    // setIsLoadingResponse(true);

  };

  const deleteChat = (chatId) => {
    const remaining = chats.filter((c) => c.id !== chatId);
    setChats(remaining);
    if (selectedChatId === chatId && remaining.length > 0) {
      setSelectedChatId(remaining[0].id);
    } else if (remaining.length === 0) {
      createNewChat();
    }
  };

  // const currentChat = getCurrentChat();

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    chat.handleOpenChat(chatId, chats);
  };
  const currentChat = chats[currentChatId];
  return (
    <main
      className="h-screen w-screen bg-[#0f0f0f] flex overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* Left Sidebar */}
      <aside
        className="bg-[#171717] border-r border-[#2a2a2a] p-4 flex flex-col"
        style={{ width: "256px", flexShrink: 0, minHeight: "100vh" }}
      >
        {/* Logo & New Chat Button */}
        <div className="mb-6 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Perplexity</h1>
          <button
            onClick={createNewChat}
            className="w-full px-4 py-2 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-[#f5f5f5] rounded-lg font-semibold text-sm transition-colors"
          >
            + New Chat
          </button>
        </div>

        {/* Chat History */}
        <div
          className="flex-1 overflow-y-auto space-y-2 pr-2"
          style={{ minHeight: 0, flex: "1 1 auto" }}
        >
          {Object.keys(chats).length === 0 ? (
            <p className="text-[#6b6b6b] text-sm text-center py-4">
              No chats yet
            </p>
          ) : (
            Object.values(chats).map((chat, index) => (
              <div
                key={index}
                onClick={() => {
                  openChat(chat.id);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors group flex items-center justify-between ${
                  selectedChatId === chat.id
                    ? "bg-[#4a4a4a] text-[#f5f5f5]"
                    : "bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#202020] hover:text-[#f5f5f5]"
                }`}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  {/* <p
                    className={`text-xs ${selectedChatId === chat.id ? "text-[#f5f5f5] opacity-70" : "text-[#6b6b6b]"}`}
                  >
                    {chat.messages.length} messages
                  </p> */}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
                    selectedChatId === chat.id
                      ? "text-[#f5f5f5]"
                      : "text-[#6b6b6b]"
                  } hover:text-red-500`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* User Profile */}
        <div className="mt-6 pt-4 border-t border-[#2a2a2a] flex items-center gap-3 p-3 rounded-lg bg-[#181818] flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#4a4a4a] flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#f5f5f5] truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-[#6b6b6b]">Free Plan</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col"
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <header
          className="h-16 bg-[#121212] border-b border-[#2a2a2a] flex items-center justify-between px-8"
          style={{ flexShrink: 0, height: "64px" }}
        >
          <div className="flex items-center gap-2">
            <select className="bg-[#181818] text-[#f5f5f5] border border-[#3a3a3a] px-3 py-1 rounded text-sm focus:outline-none">
              <option>AI Assistant</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#a0a0a0] hover:text-[#f5f5f5]">⋮</button>
          </div>
        </header>

        {/* Chat Area */}
        <div
          className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-[#0f0f0f]"
          ref={scrollRef}
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="text-center max-w-2xl px-6 py-8">
              
              <div className="mb-8 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4a4a4a] via-[#3a3a3a] to-[#0f0f0f] opacity-80"></div>
              </div>

             
              <h2 className="text-3xl font-semibold text-[#f5f5f5] mb-2">
                Good Evening, {user?.name || "User"}.
              </h2>
              <p className="text-xl text-[#a0a0a0] mb-8">
                Can I help you with anything?
              </p>

              
              <div className="flex gap-4 justify-center mb-12 flex-wrap">
                <button className="px-4 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-[#a0a0a0] hover:text-[#f5f5f5] hover:border-[#4a4a4a] transition-colors text-sm">
                  Create an Image
                </button>
                <button className="px-4 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-[#a0a0a0] hover:text-[#f5f5f5] hover:border-[#4a4a4a] transition-colors text-sm">
                  Search the web
                </button>
              </div>

              
              <div className="grid grid-cols-3 gap-4 w-full">
                {[
                  {
                    title: "Smart Budget",
                    desc: "Manage your finances and spending",
                  },
                  {
                    title: "Analytics",
                    desc: "Analyze your data and get insights",
                  },
                  { title: "Spending", desc: "Track where your money goes" },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#181818] border border-[#2a2a2a] rounded-lg hover:border-[#333333] transition-colors cursor-pointer"
                  >
                    <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#6b6b6b]">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl space-y-6 p-8 messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
              {chats[currentChatId]?.messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                message.role === "user"
                  ? "ml-auto rounded-br-none bg-white/12 text-white"
                  : "mr-auto borde-none  text-white/90"
              }`}
            >
              {message.role === "ai" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      return !inline ? (
                        <pre className="bg-black/40 p-3 rounded-lg overflow-x-auto">
                          <code {...props}>{children}</code>
                        </pre>
                      ) : (
                        <code className="bg-black/30 px-1 rounded">
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-2 leading-relaxed">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc ml-4">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal ml-4">{children}</ol>;
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
            </div>
          )}
        </div>

        {/* <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
          {chats[currentChatId]?.messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                message.role === "user"
                  ? "ml-auto rounded-br-none bg-white/12 text-white"
                  : "mr-auto borde-none  text-white/90"
              }`}
            >
              {message.role === "ai" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      return !inline ? (
                        <pre className="bg-black/40 p-3 rounded-lg overflow-x-auto">
                          <code {...props}>{children}</code>
                        </pre>
                      ) : (
                        <code className="bg-black/30 px-1 rounded">
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-2 leading-relaxed">{children}</p>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc ml-4">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal ml-4">{children}</ol>;
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
        </div> */}

        {/* Input Area */}
        <div
          className="bg-[#121212] border-t border-[#2a2a2a] p-6"
          style={{ flexShrink: 0 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyPress={(event) =>
                  event.key === "Enter" && !isLoadingResponse && handleSend()
                }
                placeholder="Message AI Chat..."
                disabled={isLoadingResponse}
                className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-[#f5f5f5] placeholder-[#6b6b6b] focus:outline-none focus:border-[#4a4a4a] focus:ring-1 focus:ring-[#4a4a4a] focus:ring-opacity-50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoadingResponse}
                className="px-6 py-3 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-[#f5f5f5] rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
