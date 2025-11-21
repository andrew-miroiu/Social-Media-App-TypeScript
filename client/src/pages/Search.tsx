import {useState, useEffect} from "react";
//import type {User} from "@supabase/supabase-js"

interface SearchUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  following: boolean;
}

export default function Search({ currentUserId } : {currentUserId: string}) {
    const [users, setUsers] = useState<SearchUser[]>([])
    const [searchedUsername, setSearchedUsername] = useState<string>("")

    useEffect(() => {
        async function getUsers() {
            const res = await fetch(`http://localhost:5000/users/${currentUserId}`);
            const data = await res.json();
            console.log("RAW DATA:", data);
            const filtered = data.filter((u: SearchUser) => u.id !== currentUserId);
            console.log(filtered);
            setUsers(filtered);

        }
        getUsers();
        
    }, []);

    const handleFollow = async (followingId : string) =>{

        const res = await fetch("http://localhost:5000/follow/follow", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            follower_id: currentUserId, 
            following_id: followingId, 
            }),
        });

        setUsers(prev =>
            prev.map(user =>
                user.id === followingId
                ? { ...user, following: true }
                : user
            )
        );

        console.log(res);

    }

    const handleUnfollow = async (followingId: string) =>{

        const res = await fetch("http://localhost:5000/follow/unfollow", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            follower_id: currentUserId, 
            following_id: followingId, 
            }),
        });

        setUsers(prev =>
            prev.map(user =>
                user.id === followingId
                ? { ...user, following: false }
                : user
            )
        );

        console.log(res);

    }


    const filteredUsers = users.filter(user =>
    user.email
      ?.toLowerCase()
      .includes(searchedUsername.toLowerCase())
    );

    return (    
        <div>
            <h1>Search Page</h1>
            <div>
                <input type="text" value={searchedUsername} onChange={(e) => setSearchedUsername(e.target.value)}/>
                {filteredUsers.map((user: SearchUser) => (
                <div className="user" key={user.id} style={{ backgroundColor: "red", gap : "2rem" }}>
                    <p><strong>{user.user_metadata.full_name || "(no name)"}</strong></p>
                    <p>{user.email}</p>
                    <button onClick={() =>
                        user.following
                        ? handleUnfollow(user.id)
                        : handleFollow(user.id)
                    }>
                        {user.following ? "Unfollow" : "Follow"}
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}
        