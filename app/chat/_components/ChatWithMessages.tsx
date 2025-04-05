import React, { useEffect } from 'react'
import formatMessageContent from './formatMessages';
import { Bot } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { API } from '@/app/utils/constant';
import useMessages from '@/app/zustand/message';
import useAppStates from '@/app/zustand/state';


const ChatWithMessages = ({ user, chatId }: { user: any, chatId: string }) => {
    const { messages, setMessages } = useMessages((state) => state)
    const { isMessageLoading } = useAppStates((state) => state)


    useEffect(() => {
        axios.get(`${API}/getMessages/${chatId}`).then((response) => {
            setMessages(response.data.messages)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>
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
                        {formatMessageContent(message, isMessageLoading)}
                    </div>
                    {message.role === 'user' && (
                        <div className="sm:w-11 w-8 h-8 sm:h-11 ml-2 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden text-gray-700">
                            <Image src={user?.imageUrl || ""} alt={user?.fullName || ""} width={44} height={44} className="object-cover w-full h-full" />
                        </div>
                    )}
                </div>
            ))}

        </>

    )
}

export default ChatWithMessages