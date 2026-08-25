"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

const hiddenPatterns = [/^\/panel\/[^/]+$/];

export function ConditionalFooter() {
  const pathname = usePathname();
  if (hiddenPatterns.some((pattern) => pattern.test(pathname))) return null;
  return <Footer />;
}
