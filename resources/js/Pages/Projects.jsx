import { useState, useRef, useEffect } from "react";
import MepLayout from "@/Layouts/MepLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Building2, Hospital, Landmark, UtensilsCrossed,
  LayoutGrid, Play, X
} from "lucide-react";
import FadeIn from "@/Components/FadeIn";

/* Custom icons matched to the Figma design (lucide doesn't have exact equivalents) */
function LuxuryVillaIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 21V12h6v9" />
      <path d="M8.5 12V6.5h6.5V12" />
      <path d="M15 21V9.5h6.5V21" />
      <path d="M2.5 21h19" />
      <circle cx="5.2" cy="15" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="7.3" cy="15" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="18" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="7.3" cy="18" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="9" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="9" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="17.3" cy="13" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="19.3" cy="13" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="17.3" cy="17" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="19.3" cy="17" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FitnessCenterIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V11h16v10" />
      <path d="M2 21h20" />
      <path d="M9 21v-4.5h6V21" />
      <path d="M9 14.5h6" />
      <path d="M7 14.5v-3.5" />
      <path d="M17 14.5v-3.5" />
      <path d="M9.7 6.3h4.6" />
      <rect x="7.8" y="5" width="2" height="2.6" rx="0.6" />
      <rect x="14.2" y="5" width="2" height="2.6" rx="0.6" />
    </svg>
  );
}

function FuelPumpIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 21h8.5" />
      <rect x="5.5" y="7" width="6" height="14" rx="1" />
      <path d="M7 10.5h3" />
      <path d="M5.5 13h6" />
      <path d="M14.5 11.5V8a1.5 1.5 0 0 1 1.5-1.5h0.3" />
      <path d="M16.3 5.2l1.4 1.4" />
      <path d="M14.5 11.5h2a1 1 0 0 1 1 1v5.5a1 1 0 0 0 2 0V12" />
    </svg>
  );
}

const CATEGORY_META = [
  { label: "Commercial Buildings", icon: <Building2 size={20} /> },
  { label: "Hospitals", icon: <Hospital size={20} /> },
  { label: "Banks", icon: <Landmark size={20} /> },
  { label: "Restaurants & Cafés", icon: <UtensilsCrossed size={20} /> },
  { label: "Luxury Villas", icon: <LuxuryVillaIcon size={20} /> },
  { label: "Fitness Centers", icon: <FitnessCenterIcon size={20} /> },
  { label: "Fuel & Industrial Projects", icon: <FuelPumpIcon size={20} /> },
];

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideoModal({ videoUrl, onClose }) {
  const ytId = getYouTubeId(videoUrl);
  const [embedFailed, setEmbedFailed] = useState(false);
  if (!ytId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1.5 text-sm transition">
          <X size={18} /> Close
        </button>
        <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-[#0C1F3F]"
          style={{ paddingTop: "56.25%" }}>
          {!embedFailed ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
              title="Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setEmbedFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-white font-semibold">This video cannot be embedded</p>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95">
                <Play size={14} fill="white" /> Watch on YouTube
              </a>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
            alt="thumbnail" className="w-20 h-12 object-cover rounded-lg opacity-60" />
          <a href={videoUrl} target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white text-xs flex items-center gap-1">
            <Play size={10} fill="currentColor" /> Open on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

/* Distinct background color per slide so scrolling is obvious even
   before/without a real image loaded in that slot. */
const SLIDE_COLORS = ["#DCE8F5", "#E7DCF2", "#DCF2E4"];

/* Scrollable image carousel — supports up to 3 images per project, drag/swipe + arrow buttons + dot indicators */
function ProjectImageCarousel({ images = [], title }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [null];

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: "smooth" });
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const next =
      direction === "left"
        ? Math.max(activeIndex - 1, 0)
        : Math.min(activeIndex + 1, displayImages.length - 1);
    scrollToIndex(next);
  };

  // Keep the dots in sync whenever the user scrolls or drags the carousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const width = el.clientWidth || 1;
      const index = Math.round(el.scrollLeft / width);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [displayImages.length]);

  const handlePointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const el = scrollRef.current;
    if (!isDragging.current || !el) return;
    const walk = e.clientX - startX.current;
    el.scrollLeft = scrollStart.current - walk;
  };

  const stopDragging = (e) => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el && e?.pointerId != null) {
      try { el.releasePointerCapture(e.pointerId); } catch { }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[220px]">
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="flex h-full overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-2xl cursor-grab active:cursor-grabbing select-none touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {displayImages.map((img, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-full h-full min-h-[220px] flex items-center justify-center"
            style={{ backgroundColor: SLIDE_COLORS[i % SLIDE_COLORS.length] }}
          >
            {img ? (
              <img
                src={img}
                alt={`${title} - image ${i + 1}`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
            ) : (
              <span className="text-sm font-medium text-[#1A3A5C]/50">
                Image {i + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      {displayImages.length > 1 && (
        <>
          <button
            onClick={() => scroll("left")}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
          >
            <svg className="w-4 h-4 text-[#1A3A5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
          >
            <svg className="w-4 h-4 text-[#1A3A5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators — click to jump straight to that image */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {displayImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className="p-1"
              >
                <span
                  className="block rounded-full transition-all duration-200"
                  style={{
                    width: activeIndex === i ? "18px" : "6px",
                    height: "6px",
                    backgroundColor:
                      activeIndex === i ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                  }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, onPlayVideo }) {
  const hasVideo = project.video_url && project.video_url.trim() !== "";

  const scopeItems = Array.isArray(project.scope)
    ? project.scope
    : (project.scope || project.description || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  // Supports project.images (array of up to 3) or falls back to single project.image
  const projectImages = Array.isArray(project.images) && project.images.length > 0
    ? project.images.slice(0, 3)
    : project.image
      ? [project.image]
      : [];

  return (
    <div
      className="
        rounded-[20px]
        overflow-hidden
        shadow-lg
        flex
        flex-col
        md:flex-row
        min-h-[280px]
      "
      style={{
        background:
          "linear-gradient(90deg,#063A72 0%,#0E67D1 100%)",
      }}
    >
      {/* LEFT IMAGE — scrollable carousel */}
      <div className="w-full md:w-[46%] p-8">
        <div className="w-full h-full min-h-[220px] rounded-2xl overflow-hidden">
          <ProjectImageCarousel images={projectImages} title={project.title} />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-[54%] px-8 py-8 flex flex-col text-white">
        <div>
          <h3 className="text-[22px] md:text-[24px] font-bold leading-[30px] mb-4">
            {project.title}
          </h3>

          <p className="font-bold text-[14px] mb-1">
            Scope of work:
          </p>

          <div className="text-[14px] leading-7 text-white/95">
            {scopeItems.length > 0 ? (
              scopeItems.map((item, index) => (
                <p key={index}>{item}</p>
              ))
            ) : (
              <p>TBC</p>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-6 flex justify-between items-end">
          <div className="text-[14px] text-white/90">
            {project.location && (
              <p>Location : {project.location}</p>
            )}

            {project.timeline && (
              <p>Timeline: {project.timeline}</p>
            )}
          </div>

          {hasVideo ? (
            <button
              onClick={() =>
                onPlayVideo(project.video_url)
              }
              className="
                bg-white
                text-[#1A3A5C]
                px-8
                py-3
                rounded-xl
                text-[14px]
                font-medium
                hover:bg-gray-100
                transition-all
                duration-300
              "
            >
              Watch Video
            </button>
          ) : (
            <div
              className="
                bg-white/20
                text-white/60
                px-8
                py-3
                rounded-xl
                text-[14px]
              "
            >
              No Video
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [], heroImage = null }) {
  const params = new URLSearchParams(window.location.search);
  const [activeCategory, setActiveCategory] = useState(params.get("category") || "All");
  const [activeVideo, setActiveVideo] = useState(null);
  const heroSecImage = "/HeroSection/heroSection.png";


  const grouped = projects.reduce((acc, p) => {
    const cat = p.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const knownOrder = CATEGORY_META.map(c => c.label);
  const groupedArray = Object.entries(grouped)
    .sort(([a], [b]) => {
      const ai = knownOrder.indexOf(a);
      const bi = knownOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map(([category, items]) => ({ category, items }));

  const filteredGroups = activeCategory === "All"
    ? groupedArray
    : groupedArray.filter(g => g.category === activeCategory);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    const url = cat === "All" ? "/projects" : `/projects?category=${encodeURIComponent(cat)}`;
    window.history.pushState({}, "", url);
  };

  const filterBtn = (isActive) =>
    `flex flex-col items-center justify-center gap-2 rounded-2xl
   text-xs font-medium transition-all duration-200
   px-4 py-5 hover:scale-105 active:scale-95
   w-[110px] sm:w-[130px] md:w-[150px]
   ${isActive ? "bg-white text-[#1A3A5C] shadow-md font-semibold" : "bg-white/15 text-white hover:bg-white/25"}`;

  const bgStyle = heroImage
    ? { backgroundImage: `url('${heroImage}')` }
    : { background: "linear-gradient(135deg, #0C1F3F 0%, #1A3A5C 50%, #1E5BA8 100%)" };

  return (
    <MepLayout>
      <Head title="Our Projects — Master MEP" />

      {activeVideo && <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* HERO — dynamic image */}
      <section className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] bg-cover bg-center bg-no-repeat flex items-center"
        style={{
                    backgroundImage: `url(${heroSecImage})`,
                    backgroundPosition: "center center"
                }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 md:px-16 py-12 sm:py-16">
          <div className="text-white text-center mx-auto">
            <FadeIn delay={0}>
              <p className="text-3xl sm:text-4xl md:text-[50px] tracking-[0.1em] font-semibold text-white mb-1">MASTER MEP</p>
              <p className="text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] text-[#96DCFF] mb-6 sm:mb-8">SOLUTION</p>

            </FadeIn>
            <FadeIn delay={150}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3 sm:mb-4">
                Our MEP Engineering Projects
              </h1>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-xs sm:text-sm text-white/70 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto">
                Master MEP has completed a wide range of engineering projects including
                HVAC, electrical, plumbing, ELV, and MEP design across Cambodia.
              </p>
            </FadeIn>
            <FadeIn delay={450}>
              <div className="flex flex-col xs:flex-row sm:flex-row gap-3 justify-center">
                <Link href="/contact"
                  className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">
                  Request Quotation
                </Link>
                <Link href="/contact"
                  className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">
                  Book Site Inspection
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <FadeIn>
        <section
          className="relative z-10 -mt-10 mx-3 sm:mx-6 md:mx-10 lg:mx-16 rounded-2xl shadow-xl py-8 sm:py-10 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #0C2D4F 0%, #1E5BA8 100%)" }}>
          <h2 className="text-white text-center font-bold text-sm sm:text-base mb-6 sm:mb-8 tracking-wide">
            Featured MEP Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
            <button onClick={() => handleCategory("All")} className={filterBtn(activeCategory === "All")}>
              <LayoutGrid size={24} /><span>All</span>
            </button>
            {CATEGORY_META.map((cat) => (
              <button key={cat.label} onClick={() => handleCategory(cat.label)}
                className={filterBtn(activeCategory === cat.label)}>
                {cat.icon}
                <span className="text-center leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* PROJECT LISTINGS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-12 sm:space-y-16">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, groupIndex) => (
            <div key={group.category}>
              <FadeIn delay={groupIndex * 50}>
                <div className="mb-5 sm:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A3A5C]">{group.category}</h2>
                  <div className="mt-1.5 w-10 h-[3px] rounded-full bg-orange-500" />
                </div>
              </FadeIn>
              <div className="space-y-4">
                {group.items.map((project, i) => (
                  <FadeIn key={project.id} delay={i * 80}>
                    <ProjectCard project={project}
                      onPlayVideo={(url) => setActiveVideo(url)} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 bg-cover bg-center text-white text-center"
        style={bgStyle}>
        <div className="absolute inset-0 bg-black/55" />
        <FadeIn className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 leading-tight">
            Trusted by Leading Brands in Cambodia
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mb-6 sm:mb-8 leading-relaxed">
            Master MEP has worked with leading brands, banks, restaurants,
            hospitals, retail stores, and commercial developers in Cambodia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact"
              className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">
              Request Quotation
            </Link>
            <Link href="/contact"
              className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">
              Contact MEP Team
            </Link>
          </div>
        </FadeIn>
      </section>
    </MepLayout>
  );
}