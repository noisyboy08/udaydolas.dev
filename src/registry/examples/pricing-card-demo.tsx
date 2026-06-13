import { PricingCard } from "@/registry/pricing-card";

export default function PricingCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <PricingCard
        name="Starter"
        price={0}
        description="For personal projects"
        features={["5 components", "Basic support", "MIT license"]}
        cta="Get started free"
      />
      <PricingCard
        name="Pro"
        price={29}
        description="For professional developers"
        features={["All 50+ components", "Priority support", "Commercial license", "Early access"]}
        cta="Get Pro"
        highlight
        badge="Most Popular"
        accentColor="#6366f1"
      />
    </div>
  );
}
