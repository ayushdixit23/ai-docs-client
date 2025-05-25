import { create } from "zustand";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type MessageStore = {
  messages: Message[];
  setMessages: (
    message: Message | Message[] | ((prev: Message[]) => Message[])
  ) => void;
};

const useMessages = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (message) => {
    set((state) => {
      if (typeof message === "function") {
        return { messages: message(state.messages) };
      } else if (Array.isArray(message)) {
        return { messages: message };
      } else {
        return { messages: [...state.messages, message] };
      }
    });
  },
}));

export default useMessages;
