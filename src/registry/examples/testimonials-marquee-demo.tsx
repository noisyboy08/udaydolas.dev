import { TestimonialsMarquee } from "@/registry/testimonials-marquee";

const ITEMS = [
  {
    quote: "Uday's portfolio is one of the most polished I've seen. Clean code, stunning UI.",
    author: "Alex Chen",
    role: "Senior Frontend Engineer",
  },
  {
    quote: "The components library is incredibly well thought out. Production ready.",
    author: "Priya Sharma",
    role: "Product Designer",
  },
  {
    quote: "Fast, accessible, and beautiful. Exactly what modern web should feel like.",
    author: "Jordan Lee",
    role: "Tech Lead",
  },
  {
    quote: "The attention to micro-interactions and animations is exceptional.",
    author: "Sarah Kim",
    role: "UX Engineer",
  },
  {
    quote: "Outstanding work. The Neon Clock alone is worth cloning this repo.",
    author: "Marco Rossi",
    role: "Full Stack Dev",
  },
];

export default function TestimonialsMarqueeDemo() {
  return (
    <div className="w-full py-4">
      <TestimonialsMarquee items={ITEMS} speed={30} />
    </div>
  );
}
