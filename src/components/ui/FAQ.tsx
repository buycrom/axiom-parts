"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function FAQ({
  items = faqItems,
  className,
}: {
  items?: readonly { id: string; question: string; answer: string }[];
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("divide-y divide-axiom-border border border-axiom-border", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-axiom-elevated/50 md:px-6"
              aria-expanded={open}
            >
              <span className="font-display text-base font-medium md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-axiom-muted transition-transform duration-200",
                  open && "rotate-180 text-axiom-accent"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-axiom-muted md:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
