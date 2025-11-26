import React, { useState } from "react";
import MessagesUsers from "../components/MessagesUsers"
import Chat from "../components/Chat"

export default function Messages({ currentUserId } : { currentUserId: string;}) {
  const [conversation, setConversation] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHeaderUser, setChatHeaderUser] = useState<string>("");
  
  return (
    <div className="flex h-[calc(100vh-73px)] bg-white">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR — USERS */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 md:w-80 lg:w-72 bg-white border-r border-slate-200 overflow-hidden flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Messages</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:block p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Messages</h2>
        </div>

        {/* Users List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <MessagesUsers
            currentUserId={currentUserId}
            sendConversationId={setConversation}
            onUserSelect={() => setIsSidebarOpen(false)}
            setChatHeaderUser={setChatHeaderUser}
          />
        </div>
      </aside>

      {/* RIGHT — CHAT SECTION */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header with Burger */}
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-slate-200 bg-white">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-slate-900">Chat - {chatHeaderUser}</h1>
        </div>

        {/* Chat Component - Takes remaining space */}
        <div className="flex-1 overflow-hidden bg-white">
          <Chat currentUserId={currentUserId} conversation_id={conversation} />
        </div>
      </div>
    </div>
  )
}