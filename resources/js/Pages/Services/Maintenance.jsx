import { useState, useEffect, useRef } from "react";
import MepLayout from "@/Layouts/MepLayout";
import { Head, Link } from "@inertiajs/react";
import { Zap, Lightbulb, Shield, Battery, Cpu, Radio } from "lucide-react";

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}
function SolarServicesCarousel() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const solarServices = [
    {
      title: "General Inspection",
      points: ["Visual inspection of indoor and outdoor units", "Check operating condition", "Check abnormal vibration and noise", "Inspect electrical components"],
    },
    {
      title: "Professional Cleaning",
      points: ["Clean evaporator coil", "Clean condenser coil", "Clean air filters", "Clean drain pipe", "Clean drainage tray", "Remove dust and debris"],
    },
    {
      title: "Performance Testing",
      points: ["Temperature measurement", "Refrigerant pressure check", "Electrical current testing", "Compressor inspection", "Fan motor inspection", "Airflow testing"],
    },
    {
      title: "Preventive Maintenance",
      points: ["Tighten electrical connections", "Lubricate moving components (where applicable)", "Check refrigerant leakage", "Inspect insulation", "Verify system safety"],
    },
    {
      title: "Service Report",
      points: ["Inspection checklist", "Performance report", "Recommended repairs (if required)", "Photos before and after service", "Maintenance history"],
    },
  ];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
    el.classList.remove("cursor-grab");
  };

  const handlePointerMove = (e) => {
    const el = scrollRef.current;
    if (!isDragging.current || !el) return;
    const walk = e.clientX - startX.current;
    el.scrollLeft = scrollStart.current - walk;
  };

  const stopDragging = (e) => {
    const el = scrollRef.current;
    isDragging.current = false;
    if (!el) return;
    if (e?.pointerId != null) {
      try { el.releasePointerCapture(e.pointerId); } catch { }
    }
    el.classList.remove("cursor-grabbing");
    el.classList.add("cursor-grab");
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Left arrow */}
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="flex absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-colors hover:brightness-95"
        style={{ backgroundColor: "#70B7DE" }}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 sm:px-12 pb-2 cursor-grab select-none touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {solarServices.map((service, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[75%] sm:w-[45%] md:w-[31%] bg-[#EAF3FC] rounded-2xl p-3 sm:p-4"
          >
            <div className="w-full aspect-[4/3] rounded-xl bg-gray-300 mb-4 overflow-hidden pointer-events-none">
              {/* Replace with actual image */}
              {/* <img src="/image/solar-design.jpg" alt={service.title} className="w-full h-full object-cover" draggable={false} /> */}
            </div>
            <h3 className="text-orange-500 font-bold text-sm sm:text-base mb-3">
              {service.title}
            </h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
              {service.points.map((p, j) => (
                <li key={j}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="flex absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-colors hover:brightness-95"
        style={{ backgroundColor: "#70B7DE" }}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

const STATIC_ITEMS = [
  { icon: <Zap className="w-10 h-10 text-white" />, title: "Electrical Systems (LV)", points: ["Main power supply (MV/LV)", "Transformer installation", "MDB / SMDB / DB", "Cable tray & wiring", "Generator & UPS", "Battery backup systems"] },
  { icon: <Lightbulb className="w-10 h-10 text-white" />, title: "Lighting Systems", points: ["Indoor lighting", "Outdoor & landscape lighting", "Emergency lighting", "Smart lighting control"] },
  { icon: <Shield className="w-10 h-10 text-white" />, title: "Security & Safety (ELV)", points: ["CCTV systems", "Access control", "Intrusion alarm", "Fire Alarm System", "Earthing & LPS"] },
  { icon: <Radio className="w-10 h-10 text-white" />, title: "Communication Systems", points: ["LAN cabling", "Wi-Fi installation", "Telephone (PABX)", "Sound (PA system)", "BMS systems"] },
  { icon: <Cpu className="w-10 h-10 text-white" />, title: "Building Management", points: ["BMS installation", "Smart building systems", "Energy monitoring"] },
  { icon: <Battery className="w-10 h-10 text-white" />, title: "Backup Power Systems", points: ["Generator installation", "UPS systems", "Battery backup", "Synchronization"] },
];
const STATIC_ICONS = [
  <Zap className="w-10 h-10 text-white" />,
  <Lightbulb className="w-10 h-10 text-white" />,
  <Shield className="w-10 h-10 text-white" />,
  <Radio className="w-10 h-10 text-white" />,
  <Cpu className="w-10 h-10 text-white" />,
  <Battery className="w-10 h-10 text-white" />,
];
const highlights = [
  { number: "01", label: "Experienced electrical engineers" },
  { number: "02", label: "International standard installation" },
  { number: "03", label: "Professional project management" },
  { number: "04", label: "Quality installation materials" },
  { number: "05", label: "Reliable testing & commissioning" },
  { number: "06", label: "Strong after-sales support" },
];
const steps = [
  { number: "1", label: "Site Survey" },
  { number: "2", label: "Electrical Load Calculation" },
  { number: "3", label: "System Design" },
  { number: "4", label: "Quotation & BOQ" },
  { number: "5", label: "Installation" },
  { number: "6", label: "Testing & Commissioning" },
  { number: "7", label: "Maintenance Support" },
];
const staticFaqs = [
  { q: "Do you install CCTV and fire alarm systems?", a: "Yes, we provide CCTV, fire alarm, access control, and ELV system installation." },
  { q: "Can you upgrade old electrical systems?", a: "Yes, we assess and upgrade existing electrical systems to meet current safety standards." },
  { q: "Do you install MDB installation?", a: "Yes, we install MDB, SMDB, and DB panels for all building types." },
  { q: "Do you provide maintenance services?", a: "Yes, we offer preventive and corrective maintenance for all electrical and ELV systems." },
];
const DEFAULTS = {
  title: "Annual Maintenance Service",
  description: "Annual Air Conditioner Maintenance Service (AMS) in Cambodia",
  bannerTitle: "Reliable Maintenance Solutions for Long-Term Building Performance",
  bannerDescription: "Protect your air conditioning investment with professional preventive maintenance. Master MEP Solution helps businesses improve cooling performance, reduce energy costs, and extend equipment lifespan through scheduled maintenance programs.",
  overviewLabel: "Electrical & ELV\nSystem Services",
  overviewDescription: "Professional power distribution, lighting, CCTV, fire alarm, access control, LAN cabling, and BMS installation services for commercial and industrial projects.",
  overviewButton: "Request HVAC Consultation",
  benefitsTitle: "Benefits of Professional Electrical Systems",
  benefitsPoints: "Improve operational safety\nReliable power distribution\nBetter security systems\nEnergy-efficient lighting\nReduced downtime risks\nLong-term building reliability",
  ctaTitle: "Start Saving Energy with Solar Power",
  ctaDescription: "Whether you're planning a residential installation, commercial rooftop system, or industrial solar project, Master MEP Solution is ready to deliver reliable, high-performance solar solutions tailored to your needs.",
  ctaButton: "Request Electrical Consultation",
};

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

export default function Electrical({ service, serviceItems = [], projects = [], heroImage = null, keyHighlights = [] }) {
  const [open, setOpen] = useState(null);

  const bgImage = service?.image ? `/storage/${service.image}` : heroImage;
  const heroTitle = service?.title ?? DEFAULTS.title;
  const heroDesc = service?.description ?? DEFAULTS.description;
  const ctaButton = service?.button_text ?? DEFAULTS.ctaButton;
  const ctaLink = service?.button_link ?? "/contact";
  const displayItems = serviceItems.length > 0 ? serviceItems : STATIC_ITEMS;

  const displayHighlights = keyHighlights.length > 0 ? keyHighlights : highlights;

  const benefitsTitle = service?.benefits_title ?? DEFAULTS.benefitsTitle;
  const benefitsPointsRaw = service?.benefits_points ?? DEFAULTS.benefitsPoints;
  const benefitsPoints = (benefitsPointsRaw || "").split("\n").map(p => p.trim()).filter(Boolean);

  // Overview section (image reference: "Core Services Overview")
  const overviewImage = service?.image ? `/storage/${service.image}` : null;
  const overviewLabelLines = DEFAULTS.overviewLabel.split("\n");

  const heroStyle = bgImage
    ? { backgroundImage: `url('${bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(135deg, #0C1F3F 0%, #1A3A5C 50%, #1E5BA8 100%)" };

  const featuredProjects = projects;

  function getFeaturedDisplay(project) {
    const ytId = getYouTubeId(project.video_url);
    const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;
    const bg = thumb || (project.image ? `/storage/${project.image}` : null);
    const scopeItems = Array.isArray(project.scope)
      ? project.scope
      : (project.scope || project.description || "").split("\n").map(s => s.trim()).filter(Boolean);
    return { ytId, bg, scopeItems };
  }

  return (
    <MepLayout>
      <Head title={`${heroTitle} — Master MEP`}>
        <meta name="description" content={heroDesc} />
        <meta name="keywords" content="electrical engineering Cambodia, ELV system installation Phnom Penh, electrical contractor Cambodia, CCTV fire alarm installation" />
      </Head>

      <style>{`
                    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease-out, transform 0.7s ease-out; will-change: opacity, transform; }
                    .reveal-visible { opacity: 1; transform: translateY(0); }
                    .hover-lift { transition: transform 0.25s ease-out, box-shadow 0.25s ease-out; }
                    .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(12, 31, 63, 0.25); }
                    .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.4); }
                    .btn-animate { transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background-color 0.2s ease-out; }
                    .btn-animate:hover { transform: translateY(-2px) scale(1.03); }
                    .btn-animate:active { transform: scale(0.97); }
                    @media (prefers-reduced-motion: reduce) {
                        .reveal { opacity: 1; transform: none; transition: none; }
                        .hover-lift:hover, .btn-animate:hover, .btn-animate:active { transform: none; }
                    }
                `}</style>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center" style={heroStyle}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto w-full text-white text-center">
          <p className="text-3xl sm:text-4xl md:text-[50px] tracking-[0.1em] font-semibold text-white mb-1">MASTER MEP</p>
          <p className="text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] text-[#96DCFF] mb-6 sm:mb-8">SOLUTION</p>
          <Reveal delay={100}><h1 className="text-3xl md:text-5xl font-bold mb-4">{heroTitle}</h1></Reveal>
          <Reveal delay={260}><p className="text-sm opacity-80 mb-8 max-w-xl mx-auto">{heroDesc}</p></Reveal>
          <Reveal delay={340}>
            <div className="flex flex-row sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">Register for AMS Request</a>
              <a href="/contact" className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">Free Site Survey</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro Banner */}
      <Reveal>
        <section className="text-white text-center px-6 py-10 mx-4 md:mx-16 rounded-2xl -mt-10 relative z-10" style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}>
          <h2 className="text-xl md:text-2xl font-bold mb-3">{DEFAULTS.bannerTitle}</h2>
          <p className="text-sm opacity-90 max-w-3xl mx-auto leading-relaxed">{DEFAULTS.bannerDescription}</p>
          <Link
            href="/contact"
            className="inline-block px-6 text-[#1d4984] mt-[1rem] sm:px-8 py-2.5 sm:py-3 bg-white rounded-xl hover:bg-blue-800 hover:text-white transition font-medium text-xs sm:text-sm"
          >
            Download Service Agreement
          </Link>
        </section>

      </Reveal>
      {/* Overview */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-2">
            Overview
          </h2>
          <p className="text-orange-500 font-bold text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
            Smart Solar Energy Solutions for Every Building
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
            Master MEP Solution specializes in designing and installing customized solar photovoltaic (PV) systems that help reduce electricity costs while supporting sustainable energy goals. Whether you need an on-grid system for lower utility bills, an off-grid solution for remote locations, or a hybrid system with battery backup, our experienced engineers deliver reliable, efficient, and long-lasting solar installations.
          </p>
        </Reveal>
      </section>
      {/* Why Annual Maintenance Matters */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 sm:py-16">
        <Reveal>
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden">
            {/* Left: image */}
            <div className="w-full md:w-[45%] shrink-0">
              <img
                src="/Services/Maintainent/ARman.png"
                alt="Technician performing AC maintenance"
                className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
              />
            </div>

            {/* Right: content */}
            <div className="w-full md:w-[55%] bg-[#CFE7F6] p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-2 sm:mb-3 leading-snug">
                Why Annual Maintenance Matters
              </h2>
              <p className="text-orange-500 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
                Regular maintenance provides significant long-term benefits, including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 sm:gap-y-2">
                <ul className="text-xs sm:text-sm text-[#1A3A5C] space-y-1.5 sm:space-y-2 list-disc list-inside">
                  <li>Lower electricity consumption</li>
                  <li>Improved cooling performance</li>
                  <li>Longer equipment lifespan</li>
                  <li>Reduced emergency repair costs</li>
                </ul>
                <ul className="text-xs sm:text-sm text-[#1A3A5C] space-y-1.5 sm:space-y-2 list-disc list-inside">
                  <li>Better indoor air quality</li>
                  <li>Early detection of potential failures</li>
                  <li>Reduced business downtime</li>
                  <li>Manufacturer-recommended preventive maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      {/* Who Should Enroll */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-1">Who Should Enroll?</h2>
            <p className="text-orange-500 text-sm sm:text-base font-medium mb-10">
              Our AMS program is ideal for:
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Reveal delay={0}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Office Buildings</p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Factories & Industrial Facilities</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Hotels & Resorts</p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Hospitals & Clinics</p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Schools & Universities</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Shopping Malls & Retail Stores</p>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Restaurants & Commercial Kitchens</p>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Banks & Financial Institutions</p>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">Mixed-use Commercial Buildings</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
     
     
      {/* Our Maintenance Services */}
      <section
        className="py-12 sm:py-16 px-4 md:px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, #0C2D4F 0%, #1E5BA8 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-10">
          <Reveal>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Our Maintenance Services
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Maintenance Services Include:
            </p>
          </Reveal>
        </div>

        <SolarServicesCarousel />
      </section>



      {/* Service Packages */}
      {/* Service Packages */}
      <section className="py-16 px-4 md:px-6 max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] text-center mb-10">
            Service Packages
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          <Reveal delay={0}>
            <div className="border-2 border-[#2E9BD6] rounded-2xl p-3 sm:p-5 md:p-6 h-full hover-lift">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#1A3A5C] leading-snug">
                  Basic Package
                </h3>
                <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 shrink-0">01</span>
              </div>

              <p className="text-[10px] sm:text-xs text-[#2E9BD6] font-medium mb-3 sm:mb-4 leading-snug">
                Service Frequency<br />Every 6 months
              </p>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Suitable for:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside mb-3 sm:mb-4">
                <li>Small offices</li>
                <li>Retail shops</li>
                <li>Residential Villas</li>
              </ul>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Includes:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside">
                <li>General Inspection</li>
                <li>Air Conditioner Cleaning</li>
                <li>Maintenance Report</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-2 border-[#2E9BD6] rounded-2xl p-3 sm:p-5 md:p-6 h-full hover-lift">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#1A3A5C] leading-snug">
                  Standard Package
                </h3>
                <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 shrink-0">02</span>
              </div>

              <p className="text-[10px] sm:text-xs text-[#2E9BD6] font-medium mb-3 sm:mb-4 leading-snug">
                Service Frequency<br />Every 4 months
              </p>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Suitable for:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside mb-3 sm:mb-4">
                <li>Medium-sized offices</li>
                <li>Restaurants</li>
                <li>Clinics</li>
                <li>Schools</li>
              </ul>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Includes:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside">
                <li>Everything in Basic</li>
                <li>More frequent inspections</li>
                <li>Priority scheduling</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="border-2 border-[#2E9BD6] rounded-2xl p-3 sm:p-5 md:p-6 h-full hover-lift col-span-2 md:col-span-1">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#1A3A5C] leading-snug">
                  Premium Package
                </h3>
                <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 shrink-0">03</span>
              </div>

              <p className="text-[10px] sm:text-xs text-[#2E9BD6] font-medium mb-3 sm:mb-4 leading-snug">
                Service Frequency<br />Every 3 months
              </p>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Suitable for:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside mb-3 sm:mb-4">
                <li>Factories</li>
                <li>Hotels</li>
                <li>Hospitals</li>
                <li>Data centers</li>
                <li>Commercial buildings</li>
              </ul>

              <p className="text-[10px] sm:text-xs font-bold text-[#1A3A5C] mb-1">Includes:</p>
              <ul className="text-[10px] sm:text-xs text-gray-700 space-y-0.5 sm:space-y-1 list-disc list-inside">
                <li>Maximum preventive maintenance</li>
                <li>Priority technical support</li>
                <li>Detailed performance reporting</li>
                <li>Reduced risk of system failure</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Annual Maintenance Process */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] text-center mb-10">
            Annual Maintenance Process
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
          <Reveal delay={0}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 1</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Customer Registration</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                Complete the AMS Registration Form.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 2</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Free Site Survey</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                Our engineers inspect your air conditioning systems and assess maintenance requirements.
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 3</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Quotation & Agreement</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                Receive a customized maintenance proposal based on equipment quantity and operating conditions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 4</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Service Scheduling</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                A maintenance calendar is prepared according to your selected package.
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 5</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Regular Maintenance Visits</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                Our certified technicians perform scheduled inspections and cleaning throughout the contract period.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
              <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">Step 6</p>
              <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">Performance Reporting</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">
                Receive detailed maintenance reports after every service visit.
              </p>
            </div>
          </Reveal>
        </div>
      </section>



      {/* FAQs */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#CFE7F6] rounded-3xl p-6 sm:p-8 md:p-10">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-6 sm:mb-8">FAQs</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
              {/* Column 1 */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <Reveal delay={0}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s1" ? null : "s1")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        Which solar system is best for my home or business?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s1" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s1" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        It depends on your electricity usage and whether you have reliable access to the national grid. On-Grid systems are ideal for reducing electricity bills, Off-Grid systems are suitable for locations without grid access, and Hybrid systems provide both savings and backup power during outages.
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s2" ? null : "s2")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        How much can I reduce my monthly electricity bill with solar?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s2" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s2" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        Savings depend on your system size, energy consumption, and sunlight exposure, but most customers see a significant reduction in their monthly bills, with some achieving up to 70-90% savings after installation.
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s3" ? null : "s3")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        How long does a solar installation project take?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s3" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s3" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        Most residential installations are completed within 3-7 days, while larger commercial or industrial projects may take a few weeks depending on system size and site complexity.
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <Reveal delay={240}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s4" ? null : "s4")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        Can the solar system still generate electricity on cloudy or rainy days?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s4" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s4" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        Yes, solar panels can still generate electricity on cloudy or rainy days, though at reduced efficiency compared to direct sunlight. Battery storage or grid connection helps maintain consistent power supply.
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={320}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s5" ? null : "s5")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        Does Master MEP Solution provide maintenance after installation?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s5" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s5" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        Yes, we offer ongoing maintenance and technical support packages to ensure your solar system continues to operate at peak efficiency for years after installation.
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === "s6" ? null : "s6")}
                      className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">
                        Can an existing building be upgraded with a solar system?
                      </span>
                      <span className="text-[#1A3A5C] shrink-0">{open === "s6" ? "▼" : "▶"}</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === "s6" ? "300px" : "0px" }}>
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">
                        Yes, most existing buildings can be retrofitted with a solar system after a site assessment confirms roof condition, structural capacity, and available space for panel installation.
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 sm:py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-2">
            Related Services
          </h2>
          <p className="text-orange-500 text-xs sm:text-sm font-medium mb-4 sm:mb-5">
            To strengthen SEO and improve user navigation, add links to related services.
          </p>

          <ul className="text-xs sm:text-sm text-[#2E5C8A] space-y-1.5 sm:space-y-2 list-disc list-inside">
            <li>
              <Link href="/services/electrical" className="hover:underline">
                Electrical Engineering Services
              </Link>
            </li>
            <li>
              <Link href="/services/maintenance" className="hover:underline">
                Annual Electrical Maintenance
              </Link>
            </li>
            <li>
              <Link href="/services/mechanical" className="hover:underline">
                Air Conditioning Installation
              </Link>
            </li>
            <li>
              <Link href="/services/maintenance" className="hover:underline">
                Air Conditioning Annual Maintenance Service (AMS)
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                MEP Design & Build solutions
              </Link>
            </li>
            <li>
              <Link href="/services/solasystem" className="hover:underline">
                Energy Efficiency Consulting
              </Link>
            </li>
          </ul>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-white text-center"
        style={bgImage
          ? { backgroundImage: `url('${bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "linear-gradient(135deg, #0C1F3F 0%, #1E5BA8 100%)" }
        }>
        <div className="absolute inset-0 bg-black/55" />
        <Reveal className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{DEFAULTS.ctaTitle}</h2>
          <p className="text-sm opacity-80 mb-8">{DEFAULTS.ctaDescription}</p>

          <div className="flex flex-row gap-2 "><Link
            href="/contact"
            className="btn-animate inline-block max-[600px]:text-[10px] px-8 py-3 max-[600px]:px-2 bg-[#2E5C8A] rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
          >
            Request Maintenance Service
          </Link>
            <Link
              href="/contact"
              className="btn-animate max-[600px]:text-[10px]  inline-block px-8 py-3 bg-[#2E5C8A] max-[600px]:px-2 rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
            >
              Contact Maintenance Team
            </Link>
            <Link
              href="/contact"
              className="btn-animate max-[600px]:text-[10px]  inline-block px-8 py-3 bg-[#2E5C8A] max-[600px]:px-2 rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
            >
              Book Site Inspection
            </Link></div>
        </Reveal>
      </section>
    </MepLayout>
  );
}