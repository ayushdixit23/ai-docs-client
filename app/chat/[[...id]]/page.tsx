"use client";
import { UserButton, useUser } from "@clerk/nextjs"
import { GiHamburgerMenu } from "react-icons/gi";
import useAppStates from "../../zustand/state";
import Sidebar from "../_components/Sidebar";
import { useParams } from "next/navigation";
import NotFound from "./non-found";
import ChatWithMessages from "../_components/ChatWithMessages";
import ChatWithOutMessages from "../_components/ChatWithOutMessages";
import Input from "../_components/Input";

// Define Types
export type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Home() {
    const { user } = useUser();
    const { isSidebarOpen, setIsSidebarOpen } = useAppStates((state) => state)
    const params = useParams()
    const { id: arrId } = params
    const chatId = arrId && arrId[0]

    if (arrId && arrId?.length > 1) {
        return <>
            <NotFound />
        </>
    }

    return (
        <div className="flex h-dvh sm:h-screen relative text-white">

            <Sidebar userId={user?.id || ""} />
            <div className="flex-1 bg-[#212121] flex flex-col h-full overflow-hidden">
                <header className="  border-[#fff]/10 shadow-sm py-3 px-4 border-b flex justify-between items-center">
                    <div className="flex justify-center  items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="mr-4 text-gray-500 hover:text-gray-700"
                        >
                            <GiHamburgerMenu />
                        </button>
                        <h1 className="text-lg font-medium ">
                            AI Chat Assistant
                        </h1>
                    </div>

                    <UserButton />
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <ChatWithOutMessages user={user}/>

                    {chatId && <ChatWithMessages user={user} chatId={chatId || ""} />}
                </div>

                <Input user={user} chatId={chatId} />
            </div>
        </div>
    );
}
