import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function followDb(follower_id: string, following_id: string) {
  const { data, error } = await supabase
    .from("follows")
    .insert([{ follower_id, following_id }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function unfollowDb(follower_id: string, following_id: string) {
    const { error } = await supabase
        .from('follows')
        .delete()
        .eq("follower_id", follower_id)
        .eq("following_id", following_id)

    if(error) throw new Error(error.message);
}