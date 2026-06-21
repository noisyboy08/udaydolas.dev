import Image from "next/image";
import React, { useMemo } from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function TeckStack() {
  const categories = useMemo(
    () => [
      { id: "01", name: "Languages", tag: "01 Languages" },
      { id: "02", name: "Frontend", tag: "02 Frontend" },
      { id: "03", name: "Backend & Database", tag: "03 Backend & Database" },
      { id: "04", name: "Dev Tools & AI", tag: "04 Dev Tools & AI" },
      { id: "05", name: "Design", tag: "05 Design" },
    ],
    []
  );

  const groupedStack = useMemo(() => {
    return categories.map((cat) => {
      const items = TECH_STACK.filter((tech) =>
        tech.categories.includes(cat.tag)
      );
      return {
        ...cat,
        items,
      };
    });
  }, [categories]);

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="flex flex-col">
          {groupedStack.map((group) => (
            <div
              key={group.id}
              className="grid grid-cols-1 border-b border-edge last:border-b-0 md:grid-cols-[180px_1fr]"
            >
              {/* Left Column: Category Info */}
              <div className="flex items-center border-b border-edge bg-zinc-500/[0.01] px-4 py-3 select-none md:border-r md:border-b-0 md:py-4 dark:bg-white/[0.005]">
                <span className="mr-2.5 font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600">
                  {group.id}
                </span>
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-500">
                  {group.name}
                </span>
              </div>

              {/* Right Column: Badges */}
              <div className="flex flex-wrap items-center gap-2 p-4">
                {group.items.map((tech) => (
                  <SimpleTooltip key={tech.key} content={tech.title}>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium select-none",
                        "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80",
                        "border border-zinc-200 dark:border-zinc-800/80",
                        "text-zinc-800 dark:text-zinc-200",
                        "transition-all duration-200 ease-in-out"
                      )}
                    >
                      {tech.theme ? (
                        <>
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`}
                            alt={`${tech.title} light icon`}
                            width={16}
                            height={16}
                            className="hidden h-4 w-4 object-contain [html.light_&]:block"
                            unoptimized
                          />
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                            alt={`${tech.title} dark icon`}
                            width={16}
                            height={16}
                            className="hidden h-4 w-4 object-contain [html.dark_&]:block"
                            unoptimized
                          />
                        </>
                      ) : (
                        <Image
                          src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                          alt={`${tech.title} icon`}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                          unoptimized
                        />
                      )}
                      <span>{tech.title}</span>
                    </a>
                  </SimpleTooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
