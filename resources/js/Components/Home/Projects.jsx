import { Link } from "@inertiajs/react";
import {
  Building2, Hospital, Landmark, UtensilsCrossed, Fuel
} from "lucide-react";
import FadeIn from "@/Components/FadeIn";

const CATEGORIES = [
  { label: "Commercial Buildings",       icon: <Building2 size={26} /> },
  { label: "Banks",                      icon: <Landmark size={26} /> },
  { label: "Restaurants & Cafés",        icon: <UtensilsCrossed size={26} /> },
  { label: "Hospitals",                  icon: <Hospital size={32} /> },
  { label: "Fuel & Industrial Projects", icon: <Fuel size={26} /> },
];

export default function Projects({ projects = [] }) {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* LEFT — Title, description, CTA */}
        <FadeIn direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-4">
            Featured Projects<br />Section
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Our project portfolio includes MEP engineering works for ABA Bank, Phillip Bank,
            Caltex, commercial buildings, luxury villas, restaurants, hospitals, and retail
            projects across Phnom Penh, Kampot, and Siem Reap.
          </p>
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-[#1A3A5C] text-white text-sm font-medium rounded-xl transition-all duration-200 hover:bg-[#0C2D4F] hover:scale-105 active:scale-95"
          >
            View All Projects
          </Link>
        </FadeIn>

        {/* RIGHT — Category icon grid */}
        <div>
          <div className="grid grid-cols-3 gap-6">
            {CATEGORIES.slice(0, 3).map((cat, i) => (
              <FadeIn key={cat.label} direction="up" delay={120 + i * 100}>
                <Link
                  href={`/projects?category=${encodeURIComponent(cat.label)}`}
                  className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group w-[140px] min-h-[96px]"
                >
                  <div className="text-[#1A3A5C] transition-transform duration-300 group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-[#1A3A5C] leading-tight">
                    {cat.label}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            {CATEGORIES.slice(3, 5).map((cat, i) => (
              <FadeIn key={cat.label} direction="up" delay={420 + i * 100}>
                <Link
                  href={`/projects?category=${encodeURIComponent(cat.label)}`}
                  className="flex flex-col items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group w-[140px] min-h-[96px]"
                >
                  <div className="text-[#1A3A5C] transition-transform duration-300 group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-[#1A3A5C] leading-tight">
                    {cat.label}
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}