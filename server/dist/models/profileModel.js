"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileFromDB = getUserProfileFromDB;
exports.uploadProfilePictureToSupabase = uploadProfilePictureToSupabase;
exports.getUserProfilePictureDb = getUserProfilePictureDb;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function getUserProfileFromDB(userId) {
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const user = usersData?.users.find((u) => u.id === userId);
    if (!user)
        throw new Error("User not found");
    const { data: followers, error } = await supabase
        .from('follows')
        .select("*")
        .eq("follower_id", userId);
    if (error)
        throw new Error(error.message);
    const followersCount = followers.length;
    const { data: following, error: errorFollowing } = await supabase
        .from('follows')
        .select("*")
        .eq("following_id", userId);
    if (errorFollowing)
        throw new Error(errorFollowing.message);
    const followingCount = following.length;
    const { data: avatar } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();
    return {
        id: user.id,
        email: user.email,
        username: user.user_metadata.username,
        full_name: user.user_metadata.full_name,
        followersCount: followersCount,
        followingCount: followingCount,
        avatar_url: avatar?.avatar_url || null,
    };
}
async function uploadProfilePictureToSupabase(file, userId) {
    if (!file)
        throw new Error("No file provided");
    const fileName = `${userId}_${Date.now()}.webp`;
    const fullUrl = await getUserProfilePictureDb(userId);
    const prefix = "/storage/v1/object/public/socialMediaApp/";
    const index = fullUrl.indexOf(prefix);
    if (index !== -1) {
        const path = fullUrl.slice(index + prefix.length);
        const { error: removeError } = await supabase.storage
            .from("socialMediaApp")
            .remove([path]);
        if (removeError)
            console.error(removeError);
    }
    const { error: uploadError } = await supabase.storage
        .from("socialMediaApp")
        .upload(`profile_pictures/${fileName}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
    });
    if (uploadError)
        throw new Error(uploadError.message);
    const { data: publicUrlData } = await supabase.storage
        .from("socialMediaApp")
        .getPublicUrl(`profile_pictures/${fileName}`);
    const avatarUrl = publicUrlData.publicUrl;
    const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId)
        .select();
    if (error)
        throw new Error(error.message);
    return avatarUrl;
}
async function getUserProfilePictureDb(userId) {
    const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();
    if (error)
        throw new Error(error.message);
    return data?.avatar_url || null;
}
