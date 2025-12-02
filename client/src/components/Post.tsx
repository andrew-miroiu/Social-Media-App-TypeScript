import {useState, useEffect} from "react";
import CommentForm from "./CommentForm"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


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
    <div className="post bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6 w-full">
      
      <div className="post-header mb-4">
        

        {image_url && (
          <img
            src={image_url}
            alt="Post media"
            className="post-image w-full max-h-[70vh] object-contain bg-black rounded-lg mt-3"
          />
        )}

        {video_url && (
          <video controls className="post-video w-full max-h-[70vh] object-contain bg-black rounded-lg mt-3">
            <source src={video_url} />
          </video>
        )}

        <h3
          onClick={() => onOpenProfile("profile", user_id)}
          className="post-author font-semibold text-sm sm:text-base text-indigo-600 cursor-pointer mt-1.5"
        >
          {username}
        </h3>
        <span className="post-content text-slate-800 text-sm sm:text-base mt-1.5">{content}</span>
      </div>

      <div className="post-actions mt-4 pt-3 border-t border-slate-200 w-full">
        
        <div className="post-stats post-stats flex items-center gap-4 text-sm text-slate-700 mb-3">
          <button
              onClick={handleLike}
              className="flex items-center gap-1 text-red-500 hover:scale-110 transition-transform"
            >
              {liked ? (
                <AiFillHeart/>
              ) : (
                <AiOutlineHeart/>
              )}
              <span className="text-slate-700">{numberOfLikes}</span>
            </button>
          <button onClick={handleOpeningComments} className="post-comment-count">💬 {numberOfComments}</button>
        </div>

        <div className={`post-comments mt-4 ${openedCommentSection === "none" ? "hidden" : "block"}`}>
          
          <CommentForm 
            post_id={post_id}
            user_id={currentUserId}
            refreshComments={fetchComments}
          />

          <div className="mt-3 space-y-2">
            {comments.map((comment) => (
              <p key={comment.id} className="post-comment text-sm text-slate-800">
                <span className="font-medium">{comment.username}:</span> {comment.text}
              </p>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}