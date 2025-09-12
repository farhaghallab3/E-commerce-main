"use client"
import { createContext, useState, ReactNode } from "react";

interface EmailContextType {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailContext = createContext<EmailContextType | undefined>(undefined);

 
export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string>("");
 
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}
