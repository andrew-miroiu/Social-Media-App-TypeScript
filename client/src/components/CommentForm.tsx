import React, {useState} from "react"

export default function CommentForm({post_id, user_id} : {post_id: string; user_id: string}) {
    
    const [text, setText] = useState<string>("");

    const handleCommentPost = async (e: React.FormEvent) => {
        e.preventDefault();

        fetch("http://localhost:5000/comments/postComment", {
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