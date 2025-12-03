"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followDb = followDb;
exports.unfollowDb = unfollowDb;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function followDb(follower_id, following_id) {
    const { data, error } = await supabase
        .from("follows")
        .insert([{ follower_id, following_id }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function unfollowDb(follower_id, following_id) {
    const { error } = await supabase
        .from('follows')
        .delete()
        .eq("follower_id", follower_id)
        .eq("following_id", following_id);
    if (error)
        throw new Error(error.message);
}
