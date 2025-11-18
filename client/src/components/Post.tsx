import React from "react";

export default function Post({userid, content, mediaUrl}: {userid: string; content: string; mediaUrl?: string}) {
  return (
    <div>
        <h3>Post by User: {userid}</h3>
        <p>{content}</p>
        {mediaUrl && <img src={mediaUrl} alt="Post media" style={{maxWidth: "300px"}} />}
    </div>
  );
}