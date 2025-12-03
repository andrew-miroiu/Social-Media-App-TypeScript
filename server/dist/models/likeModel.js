"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLikeDb = addLikeDb;
exports.removeLikeDb = removeLikeDb;
exports.getLikesForPost = getLikesForPost;
exports.userLikedPost = userLikedPost;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function addLikeDb(post_id, user_id) {
    const { data, error } = await supabase
        .from("likes")
        .insert([{ post_id, user_id }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function removeLikeDb(post_id, user_id) {
    const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", user_id);
    if (error)
        throw new Error(error.message);
}
async function getLikesForPost(post_id) {
    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", post_id);
    if (error)
        throw new Error(error.message);
    return data.length;
}
async function userLikedPost(post_id, user_id) {
    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", post_id)
        .eq("user_id", user_id);
    if (error)
        throw new Error(error.message);
    return data.length > 0 ? true : false;
}
