import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
type AssistantContextValue={open:boolean;setOpen:(value:boolean)=>void;pageContext:string;snippet:string|undefined;openAssistant:(pageContext?:string,snippet?:string)=>void};
const AssistantContext=createContext<AssistantContextValue|undefined>(undefined);
export function AssistantProvider({children}:{children:ReactNode}){const [open,setOpen]=useState(false);const [pageContext,setPageContext]=useState("");const [snippet,setSnippet]=useState<string>();const value=useMemo(()=>({open,setOpen,pageContext,snippet,openAssistant:(page="",code?:string)=>{setPageContext(page);setSnippet(code);setOpen(true)}}),[open,pageContext,snippet]);return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>}
export function useAssistant(){const value=useContext(AssistantContext);if(!value)throw new Error("useAssistant must be used within AssistantProvider");return value}
