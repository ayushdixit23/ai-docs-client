"use client";

import {  UserButton, useUser } from "@clerk/nextjs";
import { Bot, Send } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, FormEvent } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

// Define Types
type Message = {
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: number;
  title: string;
  date: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();


  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: "AI capabilities and limitations", date: "Today" },
    { id: 2, title: "Helping with coding projects", date: "Today" },
    { id: 3, title: "Creative writing assistance", date: "Yesterday" },
    { id: 4, title: "Research on machine learning", date: "Mar 20" },
    { id: 5, title: "Brainstorming business ideas", date: "Mar 19" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const API = "http://localhost:8001";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      reader.read().then(function processText(
        { done, value }: ReadableStreamReadResult<Uint8Array>
      ): Promise<void> | void {
        if (done) {
          setIsLoading(false);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const lastIndex = prev.length - 1;
          const updatedMessages = [...prev];
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: updatedMessages[lastIndex].content + chunk,
          };
          return updatedMessages;
        });

        return reader.read().then(processText);
      });
    } catch (error) {
      console.error("Error fetching streamed response:", error);
    } finally {
      setInput("");
      inputRef.current?.focus();
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    const newConversation: Conversation = {
      id: Date.now(),
      title: "New conversation",
      date: "Just now",
    };
    setConversations([newConversation, ...conversations]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-[300px]" : "w-0"
          } bg-black/90 text-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
      >
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition"
          >
            New chat
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <h2 className="text-xs uppercase tracking-wider text-gray-400 px-3 mb-2">
            Recent conversations
          </h2>
          <ul className="space-y-1">
            {conversations.map((convo) => (
              <li key={convo.id}>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-800 truncate text-sm">
                  {convo.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        {/* <div className="border-t border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="text-sm">
              <div>User Name</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
        </div> */}

      
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-3 px-4 border-b flex justify-between items-center">
          <div className="flex justify-center items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <GiHamburgerMenu />
          </button>
          <h1 className="text-lg font-medium text-gray-800">
            AI Chat Assistant
          </h1>
          </div>
         
          <UserButton/>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <p className="text-lg font-medium">How can I help you today?</p>
              <p className="mt-2 max-w-md">Ask me anything and I'll do my best to provide a helpful response.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-11 h-11 mr-2 rounded-full bg-black flex items-center justify-center text-white">

                  <Bot />
                </div>
              )}
              <div
                className={`max-w-3xl rounded-lg px-4 py-2 ${message.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white shadow-sm border rounded-bl-none'
                  }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>

              </div>
              {message.role === 'user' && (
                <div className="w-11 h-11 ml-2 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                 <Image src={user?.imageUrl || ""} alt={user?.fullName || ""}/>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-md px-4 py-2 focus:outline-none "
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md w-10 p-2 h-10 flex items-center justify-center focus:outline-none hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
