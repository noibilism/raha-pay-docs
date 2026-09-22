import { createFileRoute } from "@tanstack/react-router";
import { hashVisitor, rateLatestAssistantQuestion } from "@/lib/assistant-server";

export const Route=createFileRoute("/api/assistant-feedback")({server:{handlers:{POST:async({request})=>{
  const visitor=request.headers.get("X-Visitor-Id")?.slice(0,100);
  const body=await request.json() as {rating?:string};
  if(!visitor||!['up','down'].includes(body.rating??''))return Response.json({error:"invalid_request"},{status:400});
  const ok=await rateLatestAssistantQuestion(hashVisitor(visitor),body.rating as "up"|"down");
  return Response.json({ok},{status:ok?200:404});
}}}});
