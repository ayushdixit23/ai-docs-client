import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { Message } from "@/app/zustand/message";

const formatMessageContent = (message: Message, isMessageLoading: boolean) => {
  if (
    isMessageLoading &&
    message.role === "assistant" &&
    message.content === ""
  ) {
    return (
      <span className="animate-pulse text-gray-400">AI is thinking...</span>
    );
  }

  return message.content
    .split(/```(\w+)?\n([\s\S]*?)```/g)
    .map((part, index, arr) => {
      if (index % 3 === 2) {
        const language = arr[index - 1]?.trim() || "plaintext"
        return <CodeBlock key={index} code={part} language={language} />;
      }

      return (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          <span
            dangerouslySetInnerHTML={{
              __html: part?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </p>
      );
    });
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-md hover:bg-gray-700 transition"
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <></>

      <SyntaxHighlighter
        language={language}
        style={dracula}
        className="rounded-lg"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default formatMessageContent;
