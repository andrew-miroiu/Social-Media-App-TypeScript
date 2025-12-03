"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentDb = postCommentDb;
exports.getCommentsDb = getCommentsDb;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function postCommentDb(post_id, user_id, content) {
    const { data, error } = await supabase
        .from('comments')
        .insert([
        { "post_id": post_id, "user_id": user_id, "text": content },
    ])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function getCommentsDb(post_id) {
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq("post_id", post_id);
    if (error)
        throw new Error(error.message);
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const users = usersData?.users ?? [];
    const commentsWithUsername = comments.map((comment) => {
        const user = users.find(u => u.id === comment.user_id);
        return {
            ...comment,
            username: user?.user_metadata?.full_name ||
                user?.user_metadata?.username ||
                user?.email,
        };
    });
    return commentsWithUsername;
}
