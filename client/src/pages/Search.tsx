import {useState, useEffect} from "react";
import { API_BASE_URL } from "../lib/apiConfig";
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

export default function Search({ currentUserId , onOpenProfile} : {currentUserId: string; onOpenProfile: (page: string, userId: string) => void;}) {
    const [users, setUsers] = useState<SearchUser[]>([])
    const [searchedUsername, setSearchedUsername] = useState<string>("")

    useEffect(() => {
        async function getUsers() {
            const res = await fetch(`${API_BASE_URL}/users/${currentUserId}`);
            const data = await res.json();
            const filtered = data.filter((u: SearchUser) => u.id !== currentUserId);
            setUsers(filtered);

        }
        getUsers();
        
    }, []);

    const handleFollow = async (followingId : string) =>{

        const res = await fetch(`${API_BASE_URL}/follow/follow`, {
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

        await fetch(`${API_BASE_URL}/follow/unfollow`, {
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
    }


    const filteredUsers = users.filter(user =>
    user.user_metadata.full_name
      ?.toLowerCase()
      .includes(searchedUsername.toLowerCase())
    );

   return (
  <div className="search-page w-full max-w-xl mx-auto p-4">

    <h1 className="text-xl font-semibold mb-4">Search</h1>

    <input 
      type="text" 
      value={searchedUsername}
      onChange={(e) => setSearchedUsername(e.target.value)}
      placeholder="Search by email..."
      className="search-input w-full p-3 rounded-lg border border-slate-300 bg-slate-50 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />

    <div className="search-results flex flex-col gap-4">
      {filteredUsers.map((user: SearchUser) => (
        <div
          key={user.id}
          className="user-item flex justify-between items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div onClick={() => onOpenProfile("profile", user.id)}>
            <p className="font-semibold text-slate-800">
              {user.user_metadata.full_name || "(no name)"}
            </p>
          {/*
            <p 
              onClick={() => onOpenProfile("profile", user.id)}
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
            >
              {user.email}
            </p>*/}
          </div>
          <button
            onClick={() =>
              user.following ? handleUnfollow(user.id) : handleFollow(user.id)
            }
            className={
              user.following
                ? "unfollow px-4 py-2 rounded-lg bg-slate-200 text-slate-900 text-sm font-medium hover:bg-slate-300 transition"
                : "follow px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            }
          >
            {user.following ? "Unfollow" : "Follow"}
          </button>

        </div>
      ))}
    </div>

  </div>
);
}
        