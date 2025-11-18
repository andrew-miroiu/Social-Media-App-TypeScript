import React from "react";

export default function Post({userid, content, image_url, video_url}: {userid: string; content: string; image_url?: string; video_url?: string}) {
  return (
    <div>
        <h3>Post by User: {userid}</h3>
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