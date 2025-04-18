import { MoreVertical, Edit, Share, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Conversation } from './Sidebar'
import Link from 'next/link'
import { toast } from 'react-toastify'
import axios from 'axios'
import DeleteChatHistoryModal from './DeleteChatHistoryModals'

const ChatsHistory = ({ convo, setConversations }: { convo: Conversation, setConversations: React.Dispatch<React.SetStateAction<Conversation[]>> }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleEdit = () => {
        console.log('Edit chat:', convo._id)
        setShowDropdown(false)
    }

    const handleShare = () => {
        console.log('Share chat:', convo._id)
        setShowDropdown(false)
    }

    
    const handleDelete = async () => {
        try {
            setShowDropdown(false)
    
            setConversations((prev) => {
                const index = prev.findIndex((c) => c._id === convo._id)
                convo._originalIndex = index 
                return prev.filter((c) => c._id !== convo._id)
            })
    
            const res = await axios.delete(`/api/chats/${convo._id}`)
    
            if (res.data.success) {
                toast.success('Chat deleted successfully')
            } else {
                setConversations((prev) => {
                    const newConversations = [...prev]
                    newConversations.splice(convo._originalIndex || 0, 0, convo)
                    return newConversations
                })
                toast.error('Failed to delete chat')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete chat')

            setConversations((prev) => {
                const newConversations = [...prev]
                newConversations.splice(convo._originalIndex || 0, 0, convo)
                return newConversations
            })
        } finally {
            setShowDropdown(false)
        }
    }
    
    return (
        <>
            <div onClick={() => setShowDropdown(false)} className={`${showDropdown ? 'fixed top-0 left-0 w-full h-full z-10 opacity-50' : '-z-10'}`}></div>
            <li className='flex justify-between items-center relative'>
                <Link href={`/chat/${convo._id}`} className="w-full text-left px-4 py-2 rounded-md truncate text-[15px] divide-y">
                    {convo.title ? convo.title.length > 30 ? convo.title.slice(0, 30) + "..." : convo.title : "New Chat"}
                </Link>
                <div className="flex items-center gap-2 mr-2">
                    <button
                        className="text-gray-400 cursor-pointer hover:text-white transition-colors duration-300 p-1 rounded-full"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <MoreVertical className='w-4 h-4' />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-7 top-7 bg-[#212121] rounded-md shadow-lg py-1 z-20 w-32">
                            <button
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-gray-200"
                                onClick={handleEdit}
                            >
                                <Edit className="w-3 h-3" />
                                Edit
                            </button>
                            <button
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-gray-200"
                                onClick={handleShare}
                            >
                                <Share className="w-3 h-3" />
                                Share
                            </button>
                            <DeleteChatHistoryModal onConfirm={handleDelete} />
                        </div>
                    )}
                </div>
            </li>
        </>
    )
}

export default ChatsHistory