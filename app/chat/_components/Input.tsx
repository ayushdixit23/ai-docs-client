import { API } from '@/app/utils/constant';
import useMessages from '@/app/zustand/message';
import useAppStates from '@/app/zustand/state';
import { Send } from 'lucide-react'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

const Input = ({ user }: { user: any }) => {
    const [input, setInput] = useState<string>("");

    const { setMessages } = useMessages((state) => state)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [isMessageLoading, setIsMessageLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { setIsMessageLoading } = useAppStates((state) => state)


    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "40px"; // Reset height
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set height dynamically
        }
    }, [input]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        setMessages({ role: "user", content: input });
        setInput("")
        setMessages({ role: "assistant", content: "" });
        setIsMessageLoading(true)
        setIsLoading(true);


        const controller = new AbortController();
        const { signal } = controller;

        try {
            const res = await fetch(`${API}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input, clerkUserId: user?.id }),
                signal,
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
            if ((error as DOMException).name === "AbortError") {
                console.log("Request aborted");

            } else {
                setMessages((prev) => [
                    ...prev.filter((msg) => msg.content !== ""), // Remove empty messages
                    // @ts-ignore
                    { content: error?.message || "Something Went Wrong!", role: "assistant" } // Add the error message
                ]);
                console.error("Error fetching streamed response:", error);
            }
        } finally {
            setInput("");
             inputRef.current?.focus();

            setIsLoading(false);
        }
    };

    return (
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
                {/* <textarea
                    // ref={inputRef}
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border rounded-md border-[#fff]/10 px-4 py-2 outline-none resize-none min-h-[40px] max-h-[200px] overflow-auto"
                    placeholder="Type your message..."
                    disabled={isLoading}
                    rows={1}
                /> */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md w-10 p-2 h-10 flex items-center justify-center focus:outline-none hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !input.trim()}
                >
                    <Send size={17} />
                </button>
            </form>
        </div>
    )
}

export default Input