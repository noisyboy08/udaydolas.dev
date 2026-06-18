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
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-edge last:border-b-0"
            >
              {/* Left Column: Category Info */}
              <div className="flex items-center px-4 py-3 md:py-4 border-b border-edge md:border-b-0 md:border-r border-edge select-none bg-zinc-500/[0.01] dark:bg-white/[0.005]">
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mr-2.5 font-bold">
                  {group.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  {group.name}
                </span>
              </div>

              {/* Right Column: Badges */}
              <div className="p-4 flex flex-wrap gap-2 items-center">
                {group.items.map((tech) => (
                  <SimpleTooltip key={tech.key} content={tech.title}>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium select-none cursor-pointer",
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
                            className="hidden [html.light_&]:block w-4 h-4 object-contain"
                            unoptimized
                          />
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
                            alt={`${tech.title} dark icon`}
                            width={16}
                            height={16}
                            className="hidden [html.dark_&]:block w-4 h-4 object-contain"
                            unoptimized
                          />
                        </>
                      ) : (
                        <Image
                          src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                          alt={`${tech.title} icon`}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
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

