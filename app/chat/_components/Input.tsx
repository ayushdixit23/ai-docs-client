import React, { FormEvent, useEffect, useRef, useState } from "react";
import { API } from "@/app/utils/constant";
import useMessages from "@/app/zustand/message";
import useAppStates from "@/app/zustand/state";
import axios from "axios";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PromptSelection({
  setQueryType,
}: {
  setQueryType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={setQueryType} defaultValue="general">
      <SelectTrigger className="sm:w-[180px] w-full border border-[#fff]/10">
        <SelectValue placeholder="Query Type" />
      </SelectTrigger>
      <SelectContent className="bg-transparent text-white border border-[#fff]/40 hover:bg-none">
        <SelectGroup>
          <SelectItem value="general">General Questions</SelectItem>
          <SelectItem value="docs">Simplify Docs</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

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
  const router = useRouter();
  const [queryType, setQueryType] = useState("general");

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

      const res = await fetch(
        `${API}/generate/${chatId ? chatId : tempChatId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        }
      );

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
    } catch (error) {
      if ((error as DOMException).name === "AbortError") {
        console.log("Request aborted");
      } else {
        setMessages((prev) => [
          ...prev.filter((msg) => msg.content !== ""),
          // @ts-ignore
          { content: error?.message || "Something Went Wrong!",
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

  return (
    <div className="border-t border-y flex flex-col sm:flex-row w-ful gap-2 border-[#fff]/10 p-3">
      <PromptSelection setQueryType={setQueryType} />
      <form onSubmit={handleSubmit} className="flex w-full space-x-2">
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
          className="flex-1 border rounded-md border-[#fff]/10 px-4 py-2 outline-none resize-none min-h-[40px] max-h-[200px] overflow-auto"
          placeholder="Type your message..."
          disabled={isLoading}
          rows={1}
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
  );
};

export default Input;
