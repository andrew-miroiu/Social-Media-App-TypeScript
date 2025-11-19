import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllUsersDB() {
    const { data: usersData } = await supabase.auth.admin.listUsers();

    return usersData;
}