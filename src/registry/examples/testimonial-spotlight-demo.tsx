import { TestimonialSpotlight } from "@/registry/testimonial-spotlight";

export default function TestimonialSpotlightDemo() {
  return (
    <div className="w-full max-w-sm">
      <TestimonialSpotlight
        quote="One of the sharpest portfolio systems I've encountered. The glow effects and motion feel entirely native."
        author="Jordan Lee"
        role="Tech Lead · Vercel"
        gradientFrom="#6366f1"
        gradientTo="#06b6d4"
      />
    </div>
  );
}
