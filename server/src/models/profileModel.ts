import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserProfileFromDB(userId: string) {
  const { data: usersData } = await supabase.auth.admin.listUsers();
    const user = usersData?.users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    const { data: followers, error } = await supabase
      .from('follows')
      .select("*")
      .eq("follower_id", userId)
    
    if (error) throw new Error(error.message);

    const followersCount = followers.length;
    
    const { data: following, error: errorFollowing } = await supabase
      .from('follows')
      .select("*")
      .eq("following_id", userId)
    
    if (errorFollowing) throw new Error(errorFollowing.message);
    
    const followingCount = following.length;

    return {
        id: user.id,
        email: user.email,
        username: user.user_metadata.username,
        full_name: user.user_metadata.full_name,
        followersCount: followersCount,
        followingCount: followingCount
    };
}
