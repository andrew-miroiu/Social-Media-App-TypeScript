import {useState, useEffect} from "react";
import type {User} from "@supabase/supabase-js"

export default function Search() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function getUsers() {
            const res = await fetch(`http://localhost:5000/users`);
            const data = await res.json();
            setUsers(data.users);
        }
        getUsers();
        
    }, []);


    return (    
        <div>
            <h1>Search Page</h1>
            <div>
                {users.map((user: User) => (
                <div className="user" key={user.id} style={{ backgroundColor: "red", gap : "2rem" }}>
                    <p><strong>{user.user_metadata.full_name || "(no name)"}</strong></p>
                    <p>{user.email}</p>
                </div>
                ))}
            </div>
        </div>
    )
}
        