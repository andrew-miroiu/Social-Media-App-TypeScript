import React from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { API_BASE_URL } from "../lib/apiConfig";
import { useNavigate } from "react-router-dom";
import FeedSkeleton from "../components/skeletons/FeedSkeleton";


export default function Feed({ currentUserId } : {currentUserId: string;}) {

    const [posts, setPosts] = React.useState<Array<{id: string; username: string; user_id: string; text: string; image_url?: string; video_url?: string}>>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Fetch posts from the backend
        fetch(`${API_BASE_URL}/posts`)
            .then((res) => res.json())
            .then((data) => { 
                if (data.success) {
                    setPosts(data.posts);
                }
            })
            .finally(() => setLoading(false))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    const navigate = useNavigate();

    const openProfile = (userId: string) => {
      navigate(`/profile/${userId}`);
    };

    if (loading) {
      return <FeedSkeleton />;
    }

  return (
     <div className="flex justify-center w-full">
    <div className="w-full max-w-xl">
      <PostForm />

      {posts.map((post, index) => (
        <Post 
          key={index}
          post_id={post.id}
          username={post.username}
          user_id={post.user_id}
          content={post.text}
          image_url={post.image_url}
          video_url={post.video_url}
          currentUserId={currentUserId}
          onOpenProfile={openProfile}
        />
      ))}

    </div>
  </div>

  )
}
