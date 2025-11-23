import React, {useState} from "react"

export default function CommentForm({post_id, user_id, refreshComments} : {post_id: string; user_id: string; refreshComments:() => Promise<void>;}) {
    
    const [text, setText] = useState<string>("");

    const handleCommentPost = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("http://localhost:5000/comments/postComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                post_id: post_id,
                user_id: user_id,
                content: text
            })
        });

        setText("");
        await refreshComments();
    }

    return(
            <form onSubmit={handleCommentPost}>
                <textarea
                    placeholder="comment here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button type="submit">Post</button>
            </form>
    );
}