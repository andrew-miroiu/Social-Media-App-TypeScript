import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function addLikeDb(post_id: string, user_id: string) {
    const {data, error} = await supabase
        .from("likes")
        .insert([{ post_id, user_id }])
        .select()
        .single()

    if(error) throw new Error(error.message)

    return data;
}

export async function removeLikeDb(post_id: string, user_id: string) {
    const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", user_id)

    if(error) throw new Error(error.message);
}

export async function getLikesForPost(post_id: string) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", post_id);

  if (error) throw new Error(error.message);
  return data.length;
}

export async function userLikedPost(post_id: string, user_id: string) {
    const {data, error} = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", post_id)
        .eq("user_id", user_id)
    
    if(error) throw new Error(error.message)
        
    return data.length > 0 ? true : false;
}