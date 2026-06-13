"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  accentColor?: string;
};

export function Accordion({ items, className, allowMultiple = false, accentColor = "#6366f1" }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (!allowMultiple) next.clear();
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-muted/50"
            >
              <span>{item.question}</span>
              <ChevronDownIcon
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-300"
                style={{
                  transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  color: isOpen ? accentColor : undefined,
                }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? 500 : 0 }}
            >
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
