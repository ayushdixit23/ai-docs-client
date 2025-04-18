import React, { useEffect, useRef, useState } from 'react'
import useMessages from '@/app/zustand/message';
import useAppStates from '@/app/zustand/state';
import Messages from './Messages';


const ChatWithMessages = ({ user, chatId }: { user: any, chatId: string }) => {
    const { messages } = useMessages((state) => state)
    const { isMessageLoading } = useAppStates((state) => state)
    const scrollRef = useRef(null);
    const [hasScrolledOnce, setHasScrolledOnce] = useState(false);

    useEffect(() => {
        if (!hasScrolledOnce && messages.length > 0) {
            if (scrollRef.current) {
                // @ts-ignore
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
            setHasScrolledOnce(true);
        }
    }, [messages, hasScrolledOnce]);

    return (
        <>
            <div id="individualMessages"
                ref={scrollRef}
                style={{ height: "100%", overflowY: "scroll", display: "flex", gap: "20px", flexDirection: "column", width: "100%" }}>
                {messages.map((message, index) => (
                    <Messages message={message} key={index} isMessageLoading={isMessageLoading} user={user} />
                ))}
            </div>

        </>

    )
}

export default ChatWithMessages