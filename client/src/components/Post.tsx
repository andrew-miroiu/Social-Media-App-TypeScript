import React from "react";

export default function Post({username, user_id, content, image_url, video_url, onOpenProfile}: {username: string; user_id: string; content: string; image_url?: string; video_url?: string; onOpenProfile: (page: string, userId: string) => void;}) {
  
  
  
  return (
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
  );
}