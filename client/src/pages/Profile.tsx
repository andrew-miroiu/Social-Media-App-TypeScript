import  { useEffect, useState } from "react";

interface ProfileProps {
  userId?: string | null;
  onOpenProfile: (page: string, userId: string) => void;
  currentUser: string;
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
  id:string;
  username?: string;
  user_id: string;
  content?: string;
  image_url?: string;
  video_url?: string;
  currentUserId: string;
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
      console.log(dataPosts.posts);
      setProfilePosts(dataPosts.posts);
    }
    loadProfile();
  }, [userId]);


  if (!loadedUser || !profilePosts) return <p>Loading profile...</p>;
  
  return (
  <div className="profile-page w-full max-w-xl mx-auto p-4">

    {/* USER HEADER */}
<div className="profile-header bg-white shadow-md rounded-xl p-5 mb-6">

  {/* TOP SECTION: avatar + name */}
  <div className="flex items-center gap-4">
    
    {/* PROFILE PICTURE */}
    <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
      {/* aici vei pune poza reală */}
      <span className="text-slate-500 text-sm">No Image</span>
    </div>

    <div>
      <h1 className="text-xl font-semibold">
        {loadedUser.full_name || loadedUser.username}
      </h1>
      <p className="text-sm text-slate-600">{loadedUser.email}</p>
    </div>

  </div>

  {/* STATS */}
  <div className="flex justify-around mt-5 text-center">
    <div>
      <p className="text-lg font-bold">{profilePosts.length}</p>
      <p className="text-xs text-slate-500">Posts</p>
    </div>

    <div>
      <p className="text-lg font-bold">{loadedUser.followersCount}</p>
      <p className="text-xs text-slate-500">Followers</p>
    </div>

    <div>
      <p className="text-lg font-bold">{loadedUser.followingCount}</p>
      <p className="text-xs text-slate-500">Following</p>
    </div>
  </div>

</div>

   {/* POSTS GRID — VERTICAL RECTANGLES */}
    <div className="profile-grid grid grid-cols-3 gap-1 mt-4">
      {profilePosts.map((post, index) => (
        <div
          key={index}
          onClick={() => onOpenProfile("profilePost", post.id)}
          className="w-full aspect-[3/4] bg-black overflow-hidden rounded-md cursor-pointer"
        >
          {post.image_url && (
            <img
              src={post.image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          )}

          {post.video_url && (
            <video
              src={post.video_url}
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

}
