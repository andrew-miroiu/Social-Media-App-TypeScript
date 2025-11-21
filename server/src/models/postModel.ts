import { createClient } from "@supabase/supabase-js";
import { text } from "stream/consumers";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase credentials are missing: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in your .env"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFileToSupabase(file: any) {
  if (!file) throw new Error("No file provided");

  const fileName = `${Date.now()}_${file.originalname}`;

  // Upload file to bucket
  const { error: uploadError } = await supabase.storage
    .from("socialMediaApp")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (uploadError) throw new Error(uploadError.message);

  // Get public URL
  const { data } = supabase.storage
    .from("socialMediaApp")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function createPostInDB({ user_id, content, image_url, video_url }: any) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      text: content,
      image_url,
      video_url,
      user_id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getAllPostsFromDB() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const { data: usersData } = await supabase.auth.admin.listUsers();
  const users = usersData?.users ?? [];

  const postsWithUsernames = data?.map((post: any) => {
    const user = users.find((u: any) => u.id === post.user_id);
    return {
      ...post,
      username: user?.email ?? user?.user_metadata?.full_name ?? null,
      avatar_url: user?.user_metadata?.avatar_url ?? null,
    };
  }) ?? [];

  return postsWithUsernames;
}
