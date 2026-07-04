import { GlobeIcon, MapPinIcon, MarsIcon, VenusIcon } from "lucide-react";

import { USER } from "@/data/user";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { EmailItem } from "./email-item";
import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {/* Left column */}
          <div className="space-y-2">
            {USER.jobs.map((job, index) => {
              return (
                <JobItem
                  key={index}
                  title={job.title}
                  company={job.company}
                  website={job.website}
                />
              );
            })}

            <IntroItem icon={MapPinIcon} content={USER.address} />

            <PhoneItem phoneNumber={USER.phoneNumber} />
          </div>

          {/* Right column */}
          <div className="space-y-2">
            <EmailItem email={USER.email} />

            <IntroItem
              icon={GlobeIcon}
              content={urlToName(USER.website)}
              href={USER.website}
            />

            <IntroItem
              icon={USER.gender === "male" ? MarsIcon : VenusIcon}
              content={USER.pronouns}
            />
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
