import React from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";

export default function Feed({onOpenProfile, currentUserId} : {onOpenProfile: (page: string, userId: string) => void; currentUserId: string;}) {

    const [posts, setPosts] = React.useState<Array<{id: string; username: string; user_id: string; text: string; image_url?: string; video_url?: string}>>([]);

    React.useEffect(() => {
        // Fetch posts from the backend
        fetch("http://localhost:5000/posts")
            .then((res) => res.json())
            .then((data) => { 
                if (data.success) {
                    setPosts(data.posts);
                }
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);


  return (
    <div>
      <h1>Feed Page</h1>
      <PostForm />
        <div>
            {posts.map((post, index) => (
                <Post 
                    key={index}
                    post_id={post.id}
                    username={post.username}
                    user_id={post.user_id}
                    content={post.text}
                    image_url={post.image_url}
                    video_url={post.video_url}
                    currentUserId = {currentUserId}
                    onOpenProfile={onOpenProfile}
                />
            ))}
        </div>
    </div>
  )
}
