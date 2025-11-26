import React, {useState} from "react";
import { useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
//import type { User } from "@supabase/supabase-js"

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
   const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
    
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

        const loadMessages = async () =>{
            const res = await fetch(`http://localhost:5000/messages/getMessages/${conversation_id}`);
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

        await fetch("http://localhost:5000/messages/sendMessage", {
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

    return (
  <div className="flex flex-col h-full">

    <div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2">
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
            <div ref={messagesEndRef} />
          </div>
          
        );
        
      })}
    </div>

    <div className="flex gap-2 mt-2">
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
        className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button 
        onClick={handleSend}
        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition shrink-0"
      >
        Send
      </button>
    </div>

  </div>
);

}