"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersDB = getAllUsersDB;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function getAllUsersDB(currentUserId) {
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const { data: follows, error } = await supabase
        .from('follows')
        .select("*")
        .eq("follower_id", currentUserId);
    const followingIds = new Set(follows?.map(f => f.following_id) || []);
    const enrichedUsers = usersData.users.map(user => ({
        ...user,
        following: followingIds.has(user.id)
    }));
    return enrichedUsers;
}
