import { MoreVertical, Edit, Share, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Conversation } from './Sidebar'
import Link from 'next/link'
import { toast } from 'react-toastify'
import axios from 'axios'
import DeleteChatHistoryModal from './DeleteChatHistoryModals'
import { API } from '@/app/utils/constant'
import { useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
import useMessages from '@/app/zustand/message'

const ChatsHistory = ({ convo, setConversations }: { convo: Conversation, setConversations: React.Dispatch<React.SetStateAction<Conversation[]>> }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useUser();
    const [title, setTitle] = useState(convo.title)
    const router = useRouter();
    const pathname = usePathname();
    const { setMessages } = useMessages((state) => state)

    const handleEdit = () => {
        setIsEditing(true)
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

            const res = await axios.delete(`${API}/deleteChat/${convo._id}/${user?.id}`)

            if (res.data.success) {
                toast.success('Chat deleted successfully')
                if (pathname === `/chat/${convo._id}`) {
                    router.push('/chat')
                    setMessages([])
                }
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

    const saveEditedTitle = async () => {
        if (title.trim() === convo.title.trim()) return
        try {
            const res = await axios.put(`${API}/updateChatTitle/${convo._id}/${user?.id}`, { title })
            if (res.data.success) {
                toast.success('Chat title updated successfully')
            } else {
                toast.error('Failed to update chat title')
                setTitle(convo.title)
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to update chat title')
            setTitle(convo.title)
        }
    }


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditing(false)
            saveEditedTitle()
        }
    }

    const handleBlur = () => {
        setIsEditing(false)
        saveEditedTitle()
    }


    return (
        <>
            <div onClick={() => setShowDropdown(false)} className={`${showDropdown ? 'fixed top-0 left-0 w-full h-full z-10 opacity-50' : '-z-10'}`}></div>
            <li className='flex justify-between items-center relative'>
                {isEditing ? (
                    <div className="w-full px-4 py-2">
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            autoFocus
                            className="w-full  text-white px-2 py-1 text-[15px] rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                        />
                    </div>
                ) : (
                    <Link
                        href={`/chat/${convo._id}`}
                        className="w-full text-left px-4 py-2 rounded-md truncate text-[15px]"
                        onClick={(e) => {
                            if (isEditing) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <span className="w-full truncate">
                            {title ? title.length > 30 ? title.slice(0, 30) + "..." : title : "New Chat"}
                        </span>
                    </Link>
                )}


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
                                className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 text-sm text-left text-gray-200"
                                onClick={handleEdit}
                            >
                                <Edit className="w-3 h-3" />
                                Edit
                            </button>
                            <button
                                className="flex items-center cursor-pointer gap-2 w-full px-3 py-2 text-sm text-left text-gray-200"
                                onClick={handleShare}
                            >
                                <Share className="w-3 h-3" />
                                Share
                            </button>
                            <DeleteChatHistoryModal onConfirm={handleDelete} setShowDropdown={setShowDropdown} />
                        </div>
                    )}
                </div>
            </li>
        </>
    )
}

export default ChatsHistory