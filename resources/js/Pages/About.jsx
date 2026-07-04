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
    { label: "Integrity", icon: "/image/integrity.svg" },
    { label: "Reliability", icon: "/image/reliability.svg" },
    { label: "Innovation", icon: "/image/innovation.svg" },
    { label: "People First", icon: "/image/peopleFirst.svg" },
    { label: "Excellence", icon: "/image/excellence.svg" },
    { label: "Success", icon: "/image/success.svg" },
  ];

  return (
    <MepLayout>
      <Head title="Master MEP - About Us" />

      {/* Hero */}
      <section
        className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] bg-cover bg-no-repeat flex items-start sm:items-center justify-center text-white max-[430px]:pt-4 min-[431px]:pt-20 sm:pt-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center center"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)"
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto w-full">

          <FadeIn delay={0}>
            <p className="text-3xl sm:text-4xl md:text-[50px] tracking-[0.1em] font-semibold text-white mb-1">MASTER MEP</p>
            <p className="text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] text-[#96DCFF] mb-6 sm:mb-8">SOLUTION</p>
          </FadeIn>

          <FadeIn delay={150}>
            <h1 className="text-2xl sm:text-3xl max-w-[600px] mx-auto md:text-5xl font-bold leading-tight text-white mb-4 sm:mb-6">
              {about?.title || 'Professional MEP Engineering & Installation Company in Cambodia'}
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              {about?.description || 'Master MEP Solution Co., Ltd provides professional Mechanical, Electrical, Plumbing (MEP), HVAC, ELV, Fire Protection, and Maintenance Services.'}
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <div className="relative z-10 flex flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-xs sm:text-sm"
              >
                Request Quotation
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-xs sm:text-sm"
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
          <div className="grid min-[810px]:grid-cols-2 gap-8 items-center">
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
            <div>
              <p className="text-[25px] font-sans uppercase tracking-widest text-[#2a5c92] font-semibold mb-3">
                Values
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {values.map(({ label, icon }, i) => (
                  <FadeIn key={`${label}-${i}`} delay={i * 80}>
                    <div className="group bg-white hover:bg-[#396fa8] rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center gap-2 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-lift cursor-pointer">
                      <img
                        src={icon}
                        alt={label}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-white text-center leading-tight transition-colors duration-300">
                        {label}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
          {/* Our Team */}
          <section className=" mt-[1rem] py-20 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-16" style={{ color: "#2a5c92" }}>
                Our Team
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-14">
                {[
                  { name: "Len Somoun Founder/CEO ", position: "Managing Director", image: "/assets/images/photo/Phan Tola.png" },
                  { name: "Mr. Cheup Toley ", position: "MVAC Designer", image: "/assets/images/photo/Somphon.png" },
                  { name: "Mr. Moeu Sokleap", position: "Electrical Designer", image: "/assets/images/photo/Sarout.png" },
                  { name: "Ms. Home Sreynoy", position: "Accountant", image: "/assets/images/photo/sreymech.png" },

                ].map((member) => (
                  <div key={member.name} className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-white shadow-md mb-4 border-4 border-white">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                    <h3 className="font-bold text-sm md:text-base" style={{ color: "#2a5c92" }}>
                      {member.name}
                    </h3>
                    <p className=" text-[#758290] text-xs md:text-sm mt-1">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Business Registration Certifications */}
          <div className="w-full max-w-7xl mx-auto overflow-hidden px-4 mt-10">
            <h1 className="flex justify-center text-start text-[20px] md:text-[30px] text-[#2C3E50] leading-none font-[700]">
              Business Registration Certifications
            </h1>

            <div className="flex justify-center items-center py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 place-items-center w-full">
                <div className="bg-white p-4 w-[70%] sm:w-[85%] lg:w-full max-w-[300px]">
                  <img
                    src="/assets/images/catificate/3.png"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="bg-white p-4 w-[70%] sm:w-[85%] lg:w-full max-w-[300px]">
                  <img
                    src="/assets/images/catificate/2.png"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="bg-white p-4 w-[70%] sm:w-[85%] lg:w-full max-w-[300px]">
                  <img
                    src="/assets/images/catificate/1.png"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
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