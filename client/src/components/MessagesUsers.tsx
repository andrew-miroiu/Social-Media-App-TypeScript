import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export default function MessagesUsers({currentUserId} : {currentUserId:string}) {
    const [users, setUsers] = useState<User[]>([])

    useEffect(()=>{
        async function getUsers() {
            const res = await fetch(`http://localhost:5000/users/${currentUserId}`);
            const data = await res.json();
            const filtered = data.filter((u: User) => u.id !== currentUserId);
            setUsers(filtered);

        }
        getUsers();
    }, [])

    if(!users) return( 
        <div>Loading...</div>
    )

    return(
        <div>
            {users.map((user: User) => (
                <div>
                    <p key={user.id}>User: {user.user_metadata.full_name}</p>
                </div>
            ))}
        </div>
    )
}