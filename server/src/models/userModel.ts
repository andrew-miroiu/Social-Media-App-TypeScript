import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllUsersDB(currentUserId : string) {
    const { data: usersData } = await supabase.auth.admin.listUsers();

    const { data: follows, error } = await supabase
      .from('follows')
      .select("*")
      .eq("follower_id", currentUserId)

    const followingIds = new Set(follows?.map(f => f.following_id) || []);

    const enrichedUsers = usersData.users.map(user => ({
      ...user,
      following: followingIds.has(user.id)
    }));

  return enrichedUsers;
}