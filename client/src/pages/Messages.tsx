import React, {useState} from "react";
import MessagesUsers from "../components/MessagesUsers"
import Chat from "../components/Chat"

export default function Messages({ currentUserId } : { currentUserId: string;}) {

    const [conversation, setConversation] = useState<string>("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     return (    
           <div className="w-full flex relative overflow-hidden" style={{height: 'calc(100vh - 73px)'}}>
           

            {/* MOBILE OVERLAY */}
            {isSidebarOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* LEFT — USERS */}
            <div className={`
                fixed lg:relative inset-y-0 left-0 z-50
                w-80 lg:w-1/3 bg-white
                border-r border-slate-300 overflow-y-auto
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            style={{top: '73px', height: 'calc(100vh - 73px)'}}
            >
                <div className="flex items-center justify-between mb-4 lg:hidden">
                    <h2 className="text-lg font-semibold">Messages</h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 hover:bg-slate-200 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <MessagesUsers 
                    currentUserId={currentUserId} 
                    sendConversationId={setConversation}
                    onUserSelect={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* RIGHT — CHAT */}
            <div className="w-full lg:w-2/3 flex flex-col" style={{height: '100%'}}>
                {/* MOBILE HEADER WITH BURGER */}
                <div className="lg:hidden flex items-center gap-3 p-4 border-b border-slate-300 flex-shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold">Chat</h1>
                </div>

                <div className="flex-1 p-4 overflow-hidden">
                    <Chat currentUserId={currentUserId} conversation_id={conversation} />
                </div>
            </div>

        </div>
     )
}