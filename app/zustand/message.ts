// import { create } from 'zustand';

// export type Message = {
//   role: 'user' | 'assistant';
//   content: string;
// };

// type MessageStore = {
//   messages: Message[];
//   setMessages: (newMessage: Message) => void;
// };

// const useMessages = create<MessageStore>((set) => ({
//   messages: [],
//   setMessages: (newMessage) =>
//     set((state) => ({
//       messages: [...state.messages, newMessage],
//     })),
// }));

// export default useMessages;


import { create } from 'zustand';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type MessageStore = {
  messages: Message[];
  setMessages: (
    message:
      | Message
      | Message[]
      | ((prev: Message[]) => Message[])
  ) => void;
};

const useMessages = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (message) => {
    set((state) => {
      if (typeof message === 'function') {
        // functional update
        return { messages: message(state.messages) };
      } else if (Array.isArray(message)) {
        // replace entire message array
        return { messages: message };
      } else {
        // single message, append
        return { messages: [...state.messages, message] };
      }
    });
  },
}));

export default useMessages;
