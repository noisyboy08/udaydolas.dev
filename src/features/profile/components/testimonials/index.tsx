import { CollapsibleList } from "@/components/collapsible-list";

import { TESTIMONIALS } from "../../data/testimonials";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { TestimonialItem } from "./testimonial-item";

export function Testimonials() {
  return (
    <Panel id="testimonials">
      <PanelHeader>
        <PanelTitle>
          What My Clients Say
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({TESTIMONIALS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={TESTIMONIALS}
        max={2}
        renderItem={(item) => <TestimonialItem testimonial={item} />}
      />
    </Panel>
  );
}
