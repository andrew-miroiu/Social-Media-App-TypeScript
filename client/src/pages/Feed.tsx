import React from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { API_BASE_URL } from "../lib/apiConfig";

export default function Feed({onOpenProfile, currentUserId} : {onOpenProfile: (page: string, userId: string) => void; currentUserId: string;}) {

    const [posts, setPosts] = React.useState<Array<{id: string; username: string; user_id: string; text: string; image_url?: string; video_url?: string}>>([]);

    React.useEffect(() => {
        // Fetch posts from the backend
        fetch(`${API_BASE_URL}/posts`)
            .then((res) => res.json())
            .then((data) => { 
                if (data.success) {
                    setPosts(data.posts);
                }
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);


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
          onOpenProfile={onOpenProfile}
        />
      ))}

    </div>
  </div>

  )
}
