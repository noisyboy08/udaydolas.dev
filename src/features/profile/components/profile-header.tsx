import Image from "next/image";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after relative z-10 mt-[-56px] flex border-x border-edge sm:mt-[-128px]">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-[2px] my-[3px]">
          <Image
            className="size-24 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            width={160}
            height={160}
            priority
            sizes="(max-width: 640px) 96px, 160px"
          />
        </div>

      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4" />

        <div className="border-t border-edge">
          <h1 className="flex flex-wrap items-center gap-x-1 pl-3 text-xl font-semibold sm:pl-4 sm:text-3xl">
            <span className="whitespace-nowrap">{USER.displayName}</span>
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.6em] translate-y-px text-info" />
            </SimpleTooltip>
            {USER.namePronunciationUrl && (
              <PronounceMyName
                className="translate-y-px"
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </h1>

          <div className="min-h-8 border-t border-edge py-1 pl-3 sm:min-h-12 sm:pl-4">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
