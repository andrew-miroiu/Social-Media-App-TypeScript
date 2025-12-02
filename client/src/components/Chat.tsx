import React, {useState, useEffect, useRef} from "react";
import { supabase } from "../lib/supabaseClient";
import { API_BASE_URL } from "../lib/apiConfig";

interface Message{
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function Chat({currentUserId, conversation_id} : {currentUserId: string; conversation_id: string}) {
  const [messageContent, setMessageContent] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversation_id) return;

    const channel = supabase
      .channel(`conversation-${conversation_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation_id}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    const loadMessages = async () => {
      const res = await fetch(`${API_BASE_URL}/messages/getMessages/${conversation_id}`);
      const data = await res.json();
      setMessages(data.messages);
    }
    
    loadMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation_id])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!messageContent.trim()) return;

    await fetch(`${API_BASE_URL}/messages/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        conversation_id: conversation_id,
        sender_id: currentUserId,
        content: messageContent
      })
    });
    
    setMessageContent("");
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!conversation_id) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area - Scrollable */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isMe = message.sender_id === currentUserId;
              return (
                <div key={message.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] sm:max-w-xs p-3 rounded-xl text-sm 
                    ${isMe ? "bg-indigo-500 text-white rounded-br-none" 
                           : "bg-slate-200 text-slate-900 rounded-bl-none"}`}
                  >
                    <p className="break-words">{message.content}</p>
                    <p className={`text-[10px] mt-1 opacity-70 ${isMe ? "text-indigo-100" : "text-slate-700"}`}>
                      {new Date(message.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="border-t border-slate-200 p-4 bg-white flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend(e)}
            className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleSend}
            disabled={!messageContent.trim()}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}