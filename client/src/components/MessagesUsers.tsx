import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function MessagesUsers({currentUserId} : {currentUserId:string}) {
    const [users, setUsers] = useState<User[]>([])
    //const [conversation, setConversation = useState<any>("")

    useEffect(()=>{
        async function getUsers() {
            const res = await fetch(`http://localhost:5000/users/${currentUserId}`);
            const data = await res.json();
            const filtered = data.filter((u: User) => u.id !== currentUserId);
            setUsers(filtered);

        }
        getUsers();
    }, [])

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
      console.log(data);
    }

    if(!users) return( 
        <div>Loading...</div>
    ) 

    return(
        <div>
            {users.map((user: User) => (
                <div key={user.id}>
                    <p onClick={() => handleMessagesUserClicked(user.id)} style={{ cursor: "pointer" }}>User: {user.user_metadata.full_name}</p>
                </div>
            ))}
        </div>
    )
}