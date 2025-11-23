import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function postCommentDb(post_id: string, user_id: string, content:string) {
    const { data, error } = await supabase
        .from('comments')
        .insert([
            { "post_id": post_id, "user_id": user_id, "text": content },
        ])
        .select()
        .single()
    
    if (error) throw new Error(error.message);
    return data;
}

export async function getCommentsDb(post_id: string) {
    
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq("post_id", post_id)
            
    if (error) throw new Error(error.message);
}