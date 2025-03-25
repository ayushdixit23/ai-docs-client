"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bot, Check, Copy, Plus, Send } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, FormEvent } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import formatMessageContent from "./_components/formatMessages";
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define Types
export type Message = {
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
  const [isMessageLoading, setIsMessageLoading] = useState(false)
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
  // const API = "http://192.168.1.2:8001";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("")
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setIsMessageLoading(true)
    setIsLoading(true);


    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),

      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let firstChunkReceived = false; // Track if the first chunk is received

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

          if (!firstChunkReceived) {
            setIsMessageLoading(false);
            firstChunkReceived = true;
          }

          if (updatedMessages[lastIndex].content === "Thinking...") {
            updatedMessages[lastIndex].content = "";
          }

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
    <div className="flex h-screen relative text-white">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? " border-r border-[#fff]/10 w-[300px]" : " w-0"
          } bg-[#1f1f23] text-white absolute sm:static h-full flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
      >

        {/* New Chat Button */}
        <div className="p-4">

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-gray-500 flex justify-center sm:hidden items-center gap-2 mb-4"
          >
            <GiHamburgerMenu />
            Back To Chat
          </button>

          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-[#1f1f23] border border-[#fff]/10 rounded-md transition"
          >
            <Plus size={17} />
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
                <button className="w-full text-left px-3 py-2 rounded-md truncate text-sm">
                  {convo.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#1f1f23] flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="  border-[#fff]/10 shadow-sm py-3 px-4 border-b flex justify-between items-center">
          <div className="flex justify-center  items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <GiHamburgerMenu />
            </button>
            <h1 className="text-lg font-medium ">
              AI Chat Assistant
            </h1>
          </div>

          <UserButton />
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-4 justify-center h-full text-center text-white/80">
              <div className="w-20 h-20 mr-2 rounded-full bg-black flex items-center justify-center text-white">

                <Bot size={40} />
              </div>
              <div>
                <p className="text-lg font-medium">How can I help you today?</p>
                <p className="mt-2 max-w-md">Ask me anything and I'll do my best to provide a helpful response.</p>
              </div>

            </div>
          )}


          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="min-w-11 min-h-11 max-w-11 max-h-11 mr-2 rounded-full bg-black flex items-center justify-center text-white">
                  <Bot />
                </div>
              )}
              <div
                className={`max-w-[250px] sm:max-w-3xl text-white  rounded-lg px-4 py-2 ${message.role === 'user'
                  ? 'bg-blue-500 rounded-br-none'
                  : 'border border-[#fff]/10 shadow-sm rounded-bl-none'
                  }`}
              >
                {/* <div className="whitespace-pre-wrap text-sm sm:text-base">
                  {message.content}
                </div> */}



                {formatMessageContent(message, isMessageLoading)}


              </div>
              {message.role === 'user' && (
                <div className="sm:w-11 w-8 h-8 sm:h-11 ml-2 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden text-gray-700">
                  <Image src={user?.imageUrl || ""} alt={user?.fullName || ""} width={44} height={44} className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-y border-[#fff]/10 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-md border-[#fff]/10 px-4 py-2 outline-none "
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
