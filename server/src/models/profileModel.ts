import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserProfileFromDB(userId: string) {
  const { data: usersData } = await supabase.auth.admin.listUsers();
    const user = usersData?.users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    
    return {
        id: user.id,
        email: user.email,
        username: user.user_metadata.username,
        full_name: user.user_metadata.full_name,
    };
}
