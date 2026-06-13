import { Testimonial } from "@/registry/testimonial";

export default function TestimonialDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Testimonial
        quote="Uday's portfolio is one of the most polished I've seen. The components are production ready."
        author="Alex Chen"
        role="Senior Frontend Engineer"
        rating={5}
        variant="card"
      />
      <Testimonial
        quote="Outstanding attention to micro-interactions. Feels premium from the first click."
        author="Priya Sharma"
        role="Product Designer"
        company="Figma"
        rating={5}
        variant="spotlight"
      />
    </div>
  );
}
