import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { retrieveAssistantChunks } from "@/data/assistant-index";
import { containsSecret, sanitizeQuestion } from "@/lib/assistant-safety";
import { hashVisitor, logAssistantQuestion, useQuestionAllowance } from "@/lib/assistant-server";

const textOf=(message:UIMessage)=>message.parts.filter((part):part is Extract<typeof part,{type:"text"}>=>part.type==="text").map((part)=>part.text).join(" ");
export const Route=createFileRoute("/api/chat")({server:{handlers:{POST:async({request})=>{
  try {
    const body=await request.json() as {messages?:UIMessage[];pageContext?:string;snippet?:string};
    const visitor=request.headers.get("X-Visitor-Id")?.slice(0,100); const messages=body.messages ?? []; const question=textOf(messages.at(-1) ?? {id:"",role:"user",parts:[]});
    if(!visitor||!question)return Response.json({error:"invalid_request"},{status:400});
    const visitorHash=hashVisitor(visitor);
    if(!(await useQuestionAllowance(visitorHash)))return Response.json({error:"rate_limited"},{status:429,headers:{"Retry-After":"3600"}});
    if(containsSecret(question)){await logAssistantQuestion(visitorHash,"[redacted: secret-like value]",[]);return Response.json({error:"secret_detected",message:"Remove secret keys or signatures before asking a question."},{status:400})}
    const chunks=retrieveAssistantChunks(`${question} ${body.pageContext ?? ""} ${body.snippet ?? ""}`);
    const sources=[...new Map(chunks.map((c)=>[c.sourceUrl,c])).values()];
    const context=chunks.map((c,index)=>`SOURCE ${index+1}: ${c.sourceLabel}\nURL: ${c.sourceUrl}\n${c.text}`).join("\n\n");
    const apiKey=process.env["LOVABLE_API_KEY"];if(!apiKey)return Response.json({error:"ai_unconfigured"},{status:503});
    const gateway=createOpenAI({apiKey,baseURL:"https://ai.gateway.lovable.dev/v1"});
    const result=streamText({model:gateway.responses("openai/gpt-6-astra"),system:`You are Raha Pay Assistant. Answer only from the supplied Raha Pay documentation context. If the answer is not supported, say you do not have that information in the docs. Be concise and practical. Never request or repeat credentials. Cite relevant pages using Markdown links with the exact source URLs.\n\n${context}`,messages:await convertToModelMessages(messages),maxOutputTokens:900,providerOptions:{openai:{reasoningEffort:"low",reasoningSummary:null}}});
    void logAssistantQuestion(visitorHash,sanitizeQuestion(question),sources.map((s)=>s.sourceUrl));
    return result.toUIMessageStreamResponse();
  }catch(error){console.error("Assistant request failed",error);return Response.json({error:"assistant_unavailable"},{status:500})}
}}}});
