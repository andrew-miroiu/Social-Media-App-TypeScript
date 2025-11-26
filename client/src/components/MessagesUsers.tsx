import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function MessagesUsers({
    currentUserId, 
    sendConversationId,
    onUserSelect,
    setChatHeaderUser
} : {
    currentUserId:string; 
    sendConversationId: React.Dispatch<React.SetStateAction<string>>;
    onUserSelect?: () => void;
    setChatHeaderUser: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [users, setUsers] = useState<User[]>([])
    const [conversation, setConversation] = useState<string>("")
    const [selectedUserId, setSelectedUserId] = useState<string>("")

    useEffect(()=>{
        async function getUsers() {
            const res = await fetch(`http://localhost:5000/users/${currentUserId}`);
            const data = await res.json();
            const filtered = data.filter((u: User) => u.id !== currentUserId);
            setUsers(filtered);
        }
        getUsers();
    }, [currentUserId])

    const handleMessagesUserClicked = async (userId :string) => {
        const res = await fetch("http://localhost:5000/conversation/createConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentUserId,
            userId
        })
      });
      const data = await res.json();
        const id = data.conversation.id;

        setConversation(id);
        setSelectedUserId(userId);
        sendConversationId(id); 
        onUserSelect?.(); // Close sidebar on mobile
        console.log("CONVERSATIE", conversation);
    }

    if(!users) return( 
        <div>Loading...</div>
    ) 

    return(
        <div className="flex flex-col gap-2 p-2">
            {users.map((user: User) => (
            <div 
                key={user.id}
                onClick={() => {handleMessagesUserClicked(user.id); setChatHeaderUser(user.user_metadata.full_name || ""); }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    selectedUserId === user.id 
                        ? "bg-indigo-500 text-white shadow-md" 
                        : "hover:bg-slate-100 text-slate-900"
                }`}
            >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold ${
                    selectedUserId === user.id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-300 text-slate-600"
                }`}>
                <span>{user.user_metadata.full_name?.charAt(0).toUpperCase() || "?"}</span>
                </div>

                <p className={`font-medium text-sm ${selectedUserId === user.id ? "text-white" : "text-slate-900"}`}>{user.user_metadata.full_name}</p>
            </div>
            ))}
        </div>
    )
}