"use client";

import { QueryProvider } from "@/components/query-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
