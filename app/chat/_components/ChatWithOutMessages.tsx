import { Bot } from "lucide-react";
import React from "react";

const ChatWithOutMessages = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-center h-full text-center text-white/80">
        <div className="w-20 h-20 mr-2 rounded-full bg-black flex items-center justify-center text-white">
          <Bot size={40} />
        </div>
        <div>
          <p className="text-lg font-medium">How can I help you today?</p>
          <p className="mt-2 max-w-md">
            Ask me anything and I'll do my best to provide a helpful response.
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatWithOutMessages;
