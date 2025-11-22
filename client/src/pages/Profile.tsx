import  { useEffect, useState } from "react";
import Post from "../components/Post";

interface ProfileProps {
  userId?: string | null;
  onOpenProfile: (page: string, userId: string) => void;
}

interface LoadedUser {
  id: string;
  email?: string | null;
  username?: string | null;
  full_name?: string | null;
  followersCount?: string | null;
  followingCount?: string | null;
}

interface ProfilePosts{
  username?: string;
  user_id: string;
  content?: string;
  image_url?: string;
  video_url?: string;
}

export default function Profile({ userId, onOpenProfile }: ProfileProps) {
  const [loadedUser, setLoadedUser] = useState<LoadedUser | null>(null);
  const [profilePosts, setProfilePosts] = useState<ProfilePosts[]>([]);

  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;

      const res = await fetch(`http://localhost:5000/profile/${userId}`);
      const data = await res.json();
      setLoadedUser(data.profile);

      const resPosts = await fetch(`http://localhost:5000/posts/user/${userId}`);
      const dataPosts = await resPosts.json();
      setProfilePosts(dataPosts.posts);
    }
    loadProfile();
  }, [userId]);


  if (!loadedUser || !profilePosts) return <p>Loading profile...</p>;

  return (
    
    <div>
      <h1>Profile Page</h1>
      <p><strong>Email:</strong> {loadedUser.email}</p>
      <p><strong>User ID:</strong> {loadedUser.id}</p>
      <p>
        Username: <strong>{loadedUser.full_name || loadedUser.username}</strong>
      </p>
      <p>Followers: {loadedUser.followingCount}</p>
      <p>Following: {loadedUser.followersCount}</p>
      {
      <div>
                  {profilePosts.map((post, index) => (
                    <Post 
                      key={index}
                      username={post.username || ""}
                      user_id={post.user_id}
                      content={post.content || ""}
                      image_url={post.image_url}
                      video_url={post.video_url}
                      onOpenProfile={onOpenProfile}
                    />
                  ))}
              </div>}
    </div>
  );
}
