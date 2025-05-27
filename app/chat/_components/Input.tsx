import React, { FormEvent, useEffect, useRef, useState } from "react";
import { API } from "@/app/utils/constant";
import useMessages from "@/app/zustand/message";
import useAppStates from "@/app/zustand/state";
import axios from "axios";
import { Paperclip, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import PasteUrlModal from "./PasteUrlModal";

const Input = ({
  user,
  chatId,
  scrollToBottom,
}: {
  user: any;
  chatId: string | undefined;
  scrollToBottom: () => void;
}) => {
  const [input, setInput] = useState<string>("");
  const { setMessages } = useMessages((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setIsMessageLoading } = useAppStates((state) => state);
  const [showTooltip, setShowTooltip] = useState("");
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "40px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setMessages({ role: "user", content: input });
    setInput("");

    setMessages({ role: "assistant", content: "" });
    setIsMessageLoading(true);
    setIsLoading(true);

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    let tempChatId = chatId;
    try {
      if (!chatId) {
        const response = await axios.post(`${API}/createChat/${user?.id}`, {
          title: input,
        });
        if (response.data.success) {
          tempChatId = response.data.chatId;
        }
      }

      const res = await fetch(`${API}/followUpOrStandAlone/${chatId ? chatId : tempChatId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let firstChunkReceived = false;

      reader
        .read()
        .then(function processText({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>): Promise<void> | void {
          if (done) {
            setIsLoading(false);
            if (!chatId) {
              router.push(`/chat/${tempChatId}`);
            }
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

            if (updatedMessages[lastIndex]?.content === "Thinking...") {
              updatedMessages[lastIndex].content = "";
            }

            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content: updatedMessages[lastIndex]?.content + chunk,
            };

            return updatedMessages;
          });

          return reader.read().then(processText);
        });
    } catch (error: any) {
      if ((error as DOMException).name === "AbortError") {
        console.log("Request aborted");
      } else {
        setMessages((prev) => [
          ...prev.filter((msg) => msg.content !== ""),
          {
            content: error?.message || "Something Went Wrong!",
            role: "assistant",
          },
        ]);
      }
    } finally {
      setInput("");
      inputRef.current?.focus();
      setIsLoading(false);
    }
  };


  const handleUrlSubmit = async (input: string) => {
    if (!input.trim() || isLoading) return;
    setMessages({ role: "user", content: input });
    setMessages({ role: "assistant", content: "" });
    setIsMessageLoading(true);
    setIsLoading(true);

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    let tempChatId = chatId;
    try {
      if (!chatId) {
        const response = await axios.post(`${API}/createChat/${user?.id}`, {
          title: input,
        });
        if (response.data.success) {
          tempChatId = response.data.chatId;
        }
      }

      const res = await fetch(`${API}/getDocsScrapeData/${chatId ? chatId : tempChatId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let firstChunkReceived = false;

      reader
        .read()
        .then(function processText({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>): Promise<void> | void {
          if (done) {
            setIsLoading(false);
            if (!chatId) {
              router.push(`/chat/${tempChatId}`);
            }
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

            if (updatedMessages[lastIndex]?.content === "Thinking...") {
              updatedMessages[lastIndex].content = "";
            }

            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content: updatedMessages[lastIndex]?.content + chunk,
            };

            return updatedMessages;
          });

          return reader.read().then(processText);
        });
    } catch (error: any) {
      if ((error as DOMException).name === "AbortError") {
        console.log("Request aborted");
      } else {
        setMessages((prev) => [
          ...prev.filter((msg) => msg.content !== ""),
          {
            content: error?.message || "Something Went Wrong!",
            role: "assistant",
          },
        ]);
      }
    } finally {
      inputRef.current?.focus();
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 pb-3 mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
        <div className="border-t border-white/5 flex flex-col sm:flex-row w-full gap-3 p-4">
          <div className="flex w-full items-end space-x-3 relative">
            <div className="flex-1 relative group">
              <textarea
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none resize-none  min-h-[48px] max-h-[200px] overflow-auto transition-all duration-200 ease-in-out hover:border-white/20 hover:bg-white/10 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                placeholder="Type your message..."
                disabled={isLoading}
                rows={1}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-purple-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div className="relative">
              <PasteUrlModal
                onConfirm={(url) => {
                  handleUrlSubmit(url);
                }}
              >
                <button
                  onMouseEnter={() => setShowTooltip("link")}
                  onMouseLeave={() => setShowTooltip("")}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl w-12 h-12  flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  disabled={isLoading}
                >
                  <Paperclip
                    size={18}
                    className="text-white/70 group-hover:text-white transition-colors duration-200"
                  />
                </button>
              </PasteUrlModal>

              {/* Tooltip */}
              {showTooltip === "link" && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900/90 text-white text-sm rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 duration-200"
                >
                  Paste Your Documentation URL
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/90"
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={handleSubmit}
                onMouseEnter={() => setShowTooltip("send")}
                onMouseLeave={() => setShowTooltip("")}
                className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl w-12 h-12  flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send
                    size={17}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                )}

                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"
                />
              </button>

              {showTooltip === "send" && !isLoading && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2  px-3 py-1.5 bg-gray-900/90 text-white text-sm rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 duration-200"
                >
                  Send message
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/90"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
