import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function MessagesUsers({
    currentUserId, 
    sendConversationId,
    onUserSelect
} : {
    currentUserId:string; 
    sendConversationId: React.Dispatch<React.SetStateAction<string>>;
    onUserSelect?: () => void;
}) {
    const [users, setUsers] = useState<User[]>([])
    const [conversation, setConversation] = useState<string>("")

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
        sendConversationId(id); 
        onUserSelect?.(); // Close sidebar on mobile
        console.log("CONVERSATIE", conversation);
    }

    if(!users) return( 
        <div>Loading...</div>
    ) 

    return(
        <div className="flex flex-col gap-2">
            {users.map((user: User) => (
            <div 
                key={user.id}
                onClick={() => handleMessagesUserClicked(user.id)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition"
            >
                <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center">
                <span className="text-xs text-slate-600">IMG</span>
                </div>

                <p className="font-medium text-sm">{user.user_metadata.full_name}</p>
            </div>
            ))}
        </div>
    )
}