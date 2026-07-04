import { useState, useRef } from "react";
import MepLayout from "@/Layouts/MepLayout";
import { Head, Link } from "@inertiajs/react";
import FadeIn from "@/Components/FadeIn";

export default function About({ hero, about }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const heroImage = hero?.image ? `/storage/${hero.image}` : '/images/hero.jpg';
    const values = [
      { label: "Integrity", icon: "/image/Group 46.png" },
      { label: "Reliability", icon: "/image/Group 47.png" },
      { label: "Innovation", icon: "/image/Group 48.png" },
      { label: "Excellence", icon: "/image/Group 49.png" },
    ];    

  return (
    <MepLayout>
      <Head title="Master MEP - About Us" />

      {/* Hero */}
      <section
        className="relative min-h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto w-full">
          <FadeIn delay={0}>
            <p className="text-xs tracking-[0.4em] font-semibold text-white mb-1">MASTER MEP</p>
            <p className="text-xs tracking-[0.5em] text-gray-300 mb-8">SOLUTION</p>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6">
              {about?.title || 'Professional MEP Engineering & Installation Company in Cambodia'}
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-sm md:text-base text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              {about?.description || 'Master MEP Solution Co., Ltd provides professional Mechanical, Electrical, Plumbing (MEP), HVAC, ELV, Fire Protection, and Maintenance Services.'}
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Introduction Banner */}
      <FadeIn>
        <section
          className="text-white text-center px-6 py-12 mx-4 md:mx-16 rounded-2xl -mt-16 relative transition-shadow duration-300 hover:shadow-2xl"
          style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
        >
          <p className="text-sm uppercase tracking-widest mb-2 opacity-70">Company</p>
          <h2 className="text-3xl font-bold mb-4 tracking-widest">Introduction</h2>
          <p className="text-sm md:text-base opacity-90 leading-relaxed max-w-3xl mx-auto">
            {about?.description || 'Master MEP Solution Co., Ltd is a professional MEP engineering company in Cambodia.'}
          </p>
        </section>
      </FadeIn>
{/* Vision & Mission - hardcode */}
<section className="py-12 px-4 md:px-6 max-w-5xl mx-auto">
  <div className="grid md:grid-cols-2 gap-5">
    <FadeIn direction="left">
      <div className="bg-[#CFE6F7] rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-card-lift">
        <h3 className="text-xl font-bold text-[#1A3A5C] mb-2.5">Vision</h3>
        <p className="text-[#1A3A5C]/80 text-sm leading-relaxed">
          To become one of the leading MEP engineering companies in Cambodia with a strong technical workforce and reliable project execution.
        </p>
      </div>
    </FadeIn>
    <FadeIn direction="right" delay={100}>
      <div className="bg-white border border-[#2E6BAA] rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-card-lift">
        <h3 className="text-xl font-bold text-[#1A3A5C] mb-2.5">Mission</h3>
        <ul className="text-[#1A3A5C]/80 text-sm space-y-2">
          <li>• Deliver technical quality</li>
          <li>• Provide cost-saving engineering solutions</li>
          <li>• Maintain timeline schedules</li>
          <li>• Ensure technical excellence and good workmanship</li>
        </ul>
      </div>
    </FadeIn>
  </div>
</section>

      {/* Video & Values */}
      <section className="bg-[#1A3A5C]/10 py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <FadeIn direction="left">
              {about?.video ? (
                <div className="relative bg-gray-800 rounded-xl aspect-video overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lift">
                  <video
                    ref={videoRef}
                    src={`/storage/${about.video}`}
                    poster={heroImage}
                    controls={isPlaying}
                    className="w-full h-full object-cover"
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  >
                    Your browser doesn't support embedded video.
                  </video>
                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={handlePlay}
                      aria-label="Play video"
                      className="absolute inset-0 flex items-center justify-center bg-black/20 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lift group">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
  {values.map(({ label, icon }, i) => (
    <FadeIn key={label} delay={i * 80}>
      <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-lift">
        <img
          src={icon}
          alt={label}
          className="w-12 h-12 object-contain"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </FadeIn>
  ))}
</div>
          </div>
        </div>
      </section>

      {/* Trusted by Leading Brands */}
      <section
        className="relative py-20 bg-cover bg-center text-white text-center"
        style={{ backgroundImage: `url(${heroImage})` }}
       
      >
        <div className="absolute inset-0 bg-black/60" />
        <FadeIn className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Brands in Cambodia
          </h2>
          <p className="text-sm md:text-base opacity-80">
            Master MEP has worked with leading brands, banks, restaurants, hospitals,
            retail stores, and commercial developers in Cambodia.
          </p>
        </FadeIn>
      </section>
    </MepLayout>
  );
}