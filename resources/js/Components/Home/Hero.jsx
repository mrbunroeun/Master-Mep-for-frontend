import { Link } from "@inertiajs/react";
import FadeIn from "@/Components/FadeIn";

export default function Hero({ hero }) {
  const image = hero?.image ? `/storage/${hero.image}` : "/images/hero.jpg";

  return (
    <section
      className="relative min-h-[90vh] bg-cover bg-no-repeat flex items-center justify-center text-white"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundPosition: "center center"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)"
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">

        <FadeIn delay={0}>
          <p className="text-[50px] tracking-[0.1em] font-semibold text-white mb-1">MASTER MEP</p>
          <p className="text-xs tracking-[1em] text-[#96DCFF] mb-8">SOLUTION</p>
        </FadeIn>

        <FadeIn delay={150}>
          <h1 className="text-4xl max-w-[600px] md:text-5xl font-bold leading-tight text-white mb-6">
            Professional MEP Engineering & Installation Company in Cambodia
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="text-sm md:text-base text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master MEP Solution Co., Ltd provides professional Mechanical, Electrical, Plumbing (MEP), HVAC, ELV,
            Fire Protection, and Maintenance Services for commercial buildings, villas, banks, restaurants,
            hospitals, and industrial projects across Cambodia.
          </p>
        </FadeIn>

        <FadeIn delay={450}>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm"
            >
              Request Quotation
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm"
            >
              Book Site Inspection
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}