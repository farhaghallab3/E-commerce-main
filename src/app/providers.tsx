"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { EmailProvider } from "./Context/emailContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <EmailProvider>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </HeroUIProvider>
    </EmailProvider>
  );
}
