"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversationDb = createConversationDb;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function createConversationDb(participant_1, participant_2) {
    const { data: existing, error: existingErr } = await supabase
        .from("conversations")
        .select("*")
        .or(`and(participant1_id.eq.${participant_1},participant2_id.eq.${participant_2}),and(participant1_id.eq.${participant_2},participant2_id.eq.${participant_1})`)
        .maybeSingle();
    if (existing) {
        return existing;
    }
    const { data, error } = await supabase
        .from("conversations")
        .insert([{ participant1_id: participant_1, participant2_id: participant_2 }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
