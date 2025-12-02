import React, {useState} from "react";
import { API_BASE_URL } from "../lib/apiConfig";

export default function CommentForm({post_id, user_id, refreshComments} : {post_id: string; user_id: string; refreshComments:() => Promise<void>;}) {
    
    const [text, setText] = useState<string>("");

    const handleCommentPost = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`${API_BASE_URL}/comments/postComment`, {
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
            <form onSubmit={handleCommentPost} className="comment-form flex flex-col gap-3 mt-2 w-full">
  
                <textarea
                    placeholder="Write a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="comment-textarea w-full p-3 rounded-lg border border-slate-300 bg-slate-50 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows={2}
                />

                <button 
                    type="submit"
                    className="comment-button self-end px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    disabled={text.trim().length === 0}
                >
                    Post
                </button>

            </form>
    );
}