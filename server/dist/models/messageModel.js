"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageDb = sendMessageDb;
exports.getMessagesDb = getMessagesDb;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function sendMessageDb(conversation_id, sender_id, content) {
    const { data, error } = await supabase
        .from("messages")
        .insert([{ conversation_id: conversation_id, sender_id: sender_id, content: content }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function getMessagesDb(conversation_id) {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", { ascending: true });
    if (error)
        throw new Error(error.message);
    return data;
}
