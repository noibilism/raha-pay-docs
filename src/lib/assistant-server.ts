import { createHash } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const hashVisitor=(visitorId:string)=>createHash("sha256").update(`${visitorId}:${process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "rahapay"}`).digest("hex");
export async function useQuestionAllowance(visitorHash:string) {
  const windowStart=new Date(); windowStart.setMinutes(0,0,0);
  const { data:existing }=await supabaseAdmin.from("assistant_rate_limits").select("id,question_count").eq("visitor_hash",visitorHash).eq("window_start",windowStart.toISOString()).maybeSingle();
  const count=(existing?.question_count ?? 0)+1;
  if(existing) await supabaseAdmin.from("assistant_rate_limits").update({question_count:count}).eq("id",existing.id);
  else await supabaseAdmin.from("assistant_rate_limits").insert({visitor_hash:visitorHash,window_start:windowStart.toISOString(),question_count:count});
  void supabaseAdmin.from("assistant_rate_limits").delete().lt("window_start",new Date(Date.now()-2*60*60*1000).toISOString());
  return count<=20;
}
export async function logAssistantQuestion(visitorHash:string,question:string,sourceUrls:string[]){
  const { data }=await supabaseAdmin.from("assistant_question_logs").insert({visitor_hash:visitorHash,question,source_urls:sourceUrls}).select("id").single(); return data?.id;
}
export async function rateLatestAssistantQuestion(visitorHash:string,rating:"up"|"down"){
  const {data}=await supabaseAdmin.from("assistant_question_logs").select("id").eq("visitor_hash",visitorHash).order("created_at",{ascending:false}).limit(1).maybeSingle();
  if(!data)return false;
  const {error}=await supabaseAdmin.from("assistant_question_logs").update({rating}).eq("id",data.id).eq("visitor_hash",visitorHash);
  return !error;
}
