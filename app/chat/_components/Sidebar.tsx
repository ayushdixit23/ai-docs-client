import useAppStates from '@/app/zustand/state'
import { MoreVertical, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import axios from "axios"
import { API } from '@/app/utils/constant'
import { toast } from 'react-toastify'
import Link from 'next/link'
import useMessages from '@/app/zustand/message'
import ChatsHistory from './ChatsHistory'

export type Conversation = {
    _id: string;
    title: string;
    createdAt: string;
    _originalIndex?: number;
};

const Sidebar = ({ userId }: { userId: string }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useAppStates((state) => state)
    const [isLoading, setIsLoading] = useState(false)
    const { setMessages } = useMessages((state) => state)
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API}/getChats/${userId}`).then((res) => {
            if (res.data.success) {
                setConversations(res.data.chats)
            } else {
                toast.error(res.data.message || "Something Went Wrong!")
            }

        }).catch((err) => {
            toast.error(err.message || "Something Went Wrong!")
        }).finally(() => {
            setIsLoading(false)
        })

    }, [])

    return (
        <div
            className={`${isSidebarOpen ? " border-r border-[#fff]/10 w-[300px]" : " w-0"
                } bg-[#171717] text-white absolute sm:static h-full flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
        >
            {/* New Chat Button */}
            <div className="p-4">

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="mr-4 text-gray-500 flex justify-center sm:hidden items-center gap-2 mb-4"
                >
                    <GiHamburgerMenu />
                    Back To Chat
                </button>

                <Link
                    href={"/chat"}
                    onClick={() => {
                        setMessages([])
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-[#212121] border border-[#fff]/10 rounded-md transition"
                >
                    <Plus size={17} />
                    New chat
                </Link>
            </div>

            {/* History */}
            <div className="flex-1 overflow-y-auto px-2 pb-4">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 px-3 mb-2">
                    Recent conversations
                </h2>
                <ul className="space-y-1">
                    {conversations.map((convo) => (
                        <ChatsHistory key={convo._id} convo={convo} setConversations={setConversations} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar