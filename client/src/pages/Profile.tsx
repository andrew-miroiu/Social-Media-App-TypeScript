import  { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/apiConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams, useNavigate } from "react-router-dom";
import ProfileSkeleton from "../components/skeletons/profileSkeleton";


interface ProfileProps {
  currentUser: string;
}

interface LoadedUser {
  id: string;
  email?: string | null;
  username?: string | null;
  full_name?: string | null;
  followersCount?: string | null;
  followingCount?: string | null;
  avatar_url?: string;
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

export default function Profile({ currentUser }: ProfileProps) {
  const [loadedUser, setLoadedUser] = useState<LoadedUser | null>(null);
  const [profilePosts, setProfilePosts] = useState<ProfilePosts[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // user id din URL
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {

      if (!id) return;
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/profile/${id}`);
      const data = await res.json();
      setLoadedUser(data.profile);

      const resPosts = await fetch(`${API_BASE_URL}/posts/user/${id}`);
      const dataPosts = await resPosts.json();
      console.log(dataPosts.posts);
      setProfilePosts(dataPosts.posts);
      setLoading(false);
    }
    loadProfile();
  }, [id]);

  async function handleAvatarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loadedUser) return;

    if (!avatarFile) return alert("Choose a file!");

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("userId", loadedUser.id);

    await fetch(`${API_BASE_URL}/profile/updateProfilePicture`, {
      method: "PUT",
      body: formData,
    });

    window.location.reload();
    setIsSubmitting(false);
  }
  

  if (loading || !loadedUser) {
    return <ProfileSkeleton />;
  }

  
  return (
  <div className="profile-page w-full max-w-xl mx-auto p-4 overflow-x-hidden">


  <div className="profile-header bg-white shadow-md rounded-xl p-5 mb-6">

  <div className="flex items-center gap-4">
    
    {/* PROFILE PICTURE */}
    <div className="h-20 w-20 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
      {loadedUser.avatar_url ? (
        <img src={loadedUser.avatar_url} alt="Avatar" />
      ) : (
        <span className="text-slate-500 text-sm">No Image</span>
      )}
    </div>

    

    <div>
      <h1 className="text-xl font-semibold">
        {loadedUser.full_name || loadedUser.username}
      </h1>
      {//<p className="text-sm text-slate-600">{loadedUser.email}</p>
      }
    </div>

  </div>
      {currentUser === id && (
        <form
          className="mt-3 flex flex-col sm:flex-row gap-2 items-start sm:items-center"
          onSubmit={handleAvatarSubmit}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting || !avatarFile}
            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <ClipLoader size={14} color="#ffffff" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}


  {/* STATS */}
  <div className="flex justify-around mt-5 text-center">
    <div>
      <p className="text-lg font-bold">{profilePosts.length}</p>
      <p className="text-xs text-slate-500">Posts</p>
    </div>

    <div>
      <p className="text-lg font-bold">{loadedUser.followingCount}</p>
      <p className="text-xs text-slate-500">Followers</p>
    </div>

    <div>
      <p className="text-lg font-bold">{loadedUser.followersCount}</p>
      <p className="text-xs text-slate-500">Following</p>
    </div>
  </div>

</div>

   {/* POSTS GRID — VERTICAL RECTANGLES */}
    <div className="profile-grid grid grid-cols-3 gap-1 mt-4">
      {profilePosts.map((post, index) => (
        <div
          key={index}
          onClick={() => navigate(`/post/${post.id}`)}
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
