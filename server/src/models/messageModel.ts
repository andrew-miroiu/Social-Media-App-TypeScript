import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function sendMessageDb(conversation_id: string, sender_id: string, content: string) {
    const {data, error} = await supabase
        .from("messages")
        .insert([{conversation_id: conversation_id, sender_id: sender_id, content: content}])
        .select()
        .single()

    if (error) throw new Error(error.message);

    return data;
}

export async function getMessagesDb(conversation_id: string) {
    const {data, error} = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", {ascending: true})
    
    if(error) throw new Error(error.message)

    return data;
}