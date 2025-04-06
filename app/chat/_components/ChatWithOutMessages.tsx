import useMessages from "@/app/zustand/message";
import { Bot } from "lucide-react";
import React from "react";
import Messages from "./Messages";
import useAppStates from "@/app/zustand/state";
import { useParams } from "next/navigation";

function NoMessages() {
  return <>
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
}

const ChatWithOutMessages = ({ user }: { user: any }) => {
  const params = useParams();
  let chatId = params?.id?.[0];
  const { messages } = useMessages((state) => state);
  const { isMessageLoading } = useAppStates((state) => state);
  return (
    <>
      {(!chatId && messages.length <= 0) && <NoMessages />}

      {!chatId && messages.length > 0 &&
        <>
          {messages.map((message, index) => (
            <Messages
              message={message}
              key={index}
              isMessageLoading={isMessageLoading}
              user={user}
            />
          ))}
        </>
      }
    </>
  )
};

export default ChatWithOutMessages;

