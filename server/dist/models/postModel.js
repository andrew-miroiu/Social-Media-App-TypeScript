"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToSupabase = uploadFileToSupabase;
exports.createPostInDB = createPostInDB;
exports.getAllPostsFromDB = getAllPostsFromDB;
exports.getPostsByUsernameDb = getPostsByUsernameDb;
const supabase_js_1 = require("@supabase/supabase-js");
//import { text } from "stream/consumers";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials are missing: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in your .env");
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
async function uploadFileToSupabase(file) {
    if (!file)
        throw new Error("No file provided");
    const fileName = `${Date.now()}_${file.originalname}`;
    // Upload file to bucket
    const { error: uploadError } = await supabase.storage
        .from("socialMediaApp")
        .upload(fileName, file.buffer, {
        contentType: file.mimetype,
    });
    if (uploadError)
        throw new Error(uploadError.message);
    // Get public URL
    const { data } = supabase.storage
        .from("socialMediaApp")
        .getPublicUrl(fileName);
    return data.publicUrl;
}
async function createPostInDB({ user_id, content, image_url, video_url }) {
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
    if (error)
        throw new Error(error.message);
    return data;
}
async function getAllPostsFromDB() {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
    if (error)
        throw new Error(error.message);
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const users = usersData?.users ?? [];
    const postsWithUsernames = data?.map((post) => {
        const user = users.find((u) => u.id === post.user_id);
        return {
            ...post,
            username: user?.user_metadata?.full_name ?? user?.email ?? null,
            avatar_url: user?.user_metadata?.avatar_url ?? null,
        };
    }) ?? [];
    return postsWithUsernames;
}
async function getPostsByUsernameDb(user_id) {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
}
