import React from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";

export default function Feed() {

    const [posts, setPosts] = React.useState<Array<{user_id: string; text: string; image_url?: string}>>([]);

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
            console.log("Posts fetched:", posts);
    }, []);

  return (
    <div>
      <h1>Feed Page</h1>
      <PostForm />
        <div>
            {posts.map((post, index) => (
                <Post 
                    key={index}
                    userid={post.user_id}
                    content={post.text}
                    mediaUrl={post.image_url}
                />
            ))}
        </div>
    </div>
  )
}
