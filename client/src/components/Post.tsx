import {useState, useEffect} from "react";
import CommentForm from "./CommentForm"

interface Comments {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
  created_at: string;
  username: string;
}

export default function Post({post_id, username, user_id, content, image_url, video_url, currentUserId, onOpenProfile}: {post_id: string; username: string; user_id: string; content: string; image_url?: string; video_url?: string; currentUserId : string; onOpenProfile: (page: string, userId: string) => void;}) {
  
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)
  const [openedCommentSection, setOpenedCommentSection] = useState<string>("none")
  const [comments, setComments] = useState<Comments[]>([])
  const [numberOfComments, setNumberOfComments] = useState<number>(0)

  useEffect(() => {
  async function loadLikes() {
    if (!post_id) return;

    const res = await fetch(`http://localhost:5000/like/numberOflikes/${post_id}`);
    const data = await res.json();
    setNumberOfLikes(data.numberOflikes);

    if(!currentUserId) return;

    const result = await fetch(`http://localhost:5000/like/userLiked/${post_id}/${currentUserId}`);
    const isLiked = await result.json();
    setLiked(isLiked.liked);
  }

  loadLikes();
  }, []);

  const handleLike = async () => {
        const res = await fetch("http://localhost:5000/like/toggleLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          post_id: post_id,
          user_id: currentUserId,
          isLiked: liked
        })
      });

      const data = await res.json();
      setLiked(data.liked);
      setNumberOfLikes(prev => (data.liked ? prev + 1 : prev - 1));
  }

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:5000/comments/getComments/${post_id}`)
    const data = await res.json();
    setComments(data.comments)
    setNumberOfComments(data.numberOfComments)
  }

  const handleOpeningComments = async () => {

    if(openedCommentSection === "none"){
      setOpenedCommentSection("block")
      await fetchComments();
    }
    else{
      setOpenedCommentSection("none")
    }
  }
  
  return (
    <div>
      <div>
        <h3 onClick={() => onOpenProfile("profile", user_id)} style={{cursor: "pointer"}}>Post by User: {username}</h3>
        <p>{content}</p>
        {image_url && <img src={image_url} alt="Post media" style={{maxWidth: "400px"}} />}
        {video_url && (
          <video controls style={{maxWidth: "400px"}}>
            <source src={video_url} />
          </video>
        )}
      </div>
      <div className="likes-comments">
        <div className="likes">
          <p>Likes: {numberOfLikes}</p>
          <p>Comments: {numberOfComments}</p>
          <button onClick={handleLike}>
            {liked ? "Unlike" : "Like"}
          </button>
          <button onClick={handleOpeningComments}>
            Comments
          </button>
        </div>
          <div className="comments" style={{display: openedCommentSection}}>
            <CommentForm post_id = {post_id} user_id = {user_id} refreshComments = {fetchComments}></CommentForm>
            {comments.map((comment) => (
              <p key={comment.id}>
                {comment.username}: {comment.text}
              </p>
            ))}
          </div>  
          
      </div>
    </div>
  );
}