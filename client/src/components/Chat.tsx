import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
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
                setMessages((prev) => [...prev, payload.new]);
            }
            )
            .subscribe();

        const loadMessages = async () =>{
            const res = await fetch(`http://localhost:5000/messages/getMessages/${conversation_id}`);
            const data = await res.json();
            setMessages(data.messages);
        }

        loadMessages();

    }, [conversation_id])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

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
        console.log( "conversation: " + conversation_id,
                 "current user: ", currentUserId,
                 messageContent)
    }

    return(
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <p>{message.sender_id}: {message.content}</p>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    className="message-input"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
                    />
                <button className="send-btn" onClick={handleSend}></button>
            </div>
        </div>
    )
}