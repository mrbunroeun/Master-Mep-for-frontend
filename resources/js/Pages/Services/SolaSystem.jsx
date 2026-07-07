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

// Fallback content used only when no serviceItems have been added yet
const DEFAULT_SOLAR_SERVICES = [
    {
        title: "Solar System Design",
        points: ["Energy consumption analysis", "Site assessment", "System sizing", "ROI calculation"],
    },
    {
        title: "Engineering & Installation",
        points: ["Solar panel installation", "Inverter installation", "Battery installation", "Mounting structure installation", "Electrical wiring", "Grid connection"],
    },
    {
        title: "Testing & Commissioning",
        points: ["Performance testing", "System verification", "Safety inspection", "Operational training"],
    },
    {
        title: "Maintenance & Support",
        points: ["Solar panel cleaning", "Performance inspection", "Inverter testing", "Battery health monitoring", "Preventive maintenance"],
    },
];

function SolarServicesCarousel({ services = DEFAULT_SOLAR_SERVICES }) {
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStart = useRef(0);

    const solarServices = services.length > 0 ? services : DEFAULT_SOLAR_SERVICES;

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

            <div
                ref={scrollRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 sm:px-12 pb-2 cursor-grab select-none touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {solarServices.map((service, i) => {
                    const points = Array.isArray(service.points)
                        ? service.points
                        : (service.points || "").split("\n").map((s) => s.trim()).filter(Boolean);
                    const imageSrc = service.image
                        ? (service.image.startsWith?.("http") || service.image.startsWith?.("/") ? service.image : `/storage/${service.image}`)
                        : null;

                    return (
                        <div
                            key={i}
                            className="snap-start shrink-0 w-[75%] sm:w-[45%] md:w-[31%] bg-[#EAF3FC] rounded-2xl p-3 sm:p-4"
                        >
                            <div className="w-full aspect-[4/3] rounded-xl bg-gray-300 mb-4 overflow-hidden pointer-events-none">
                                {imageSrc && (
                                    <img src={imageSrc} alt={service.title} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <h3 className="text-orange-500 font-bold text-sm sm:text-base mb-3">
                                {service.title}
                            </h3>
                            <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5">
                                {points.map((p, j) => (
                                    <li key={j}>• {p}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

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
const highlights = [
    { number: "01", label: "Experienced electrical engineers" },
    { number: "02", label: "International standard installation" },
    { number: "03", label: "Professional project management" },
    { number: "04", label: "Quality installation materials" },
    { number: "05", label: "Reliable testing & commissioning" },
    { number: "06", label: "Strong after-sales support" },
];

// Generic item shape (matches admin form): { title, subtitle, description, points, image }
// description = two paragraphs separated by a blank line: Best For, then How It Works
// points = benefits list (one per line)
const DEFAULT_SOLAR_TYPES = [
    {
        title: "On-Grid Solar System (No Battery)",
        description: "Homes, offices, commercial buildings, schools, factories, and businesses with reliable electricity from the national grid.\n\nAn On-Grid Solar System generates electricity during the day to power your building. Any additional electricity can be exported to the utility grid (subject to local regulations), helping reduce your monthly electricity bills.",
        points: "Lower electricity costs\nNo battery maintenance\nHigher energy efficiency\nLower installation cost\nEnvironmentally friendly\nIdeal for daytime electricity usage",
        image: null,
    },
    {
        title: "Off-Grid Solar System (Battery Storage)",
        description: "Remote villages, farms, construction sites, telecommunication stations, resorts, and locations without access to the electricity grid.\n\nAn Off-Grid Solar System stores solar energy in batteries, allowing electricity to be used day and night without relying on the national power grid.",
        points: "Complete energy independence\nReliable power in remote areas\nBattery backup during cloudy days\nSuitable for rural developments\nContinuous electricity supply",
        image: null,
    },
    {
        title: "Hybrid Solar System (Grid + Battery)",
        description: "Businesses, hospitals, hotels, factories, offices, villas, and customers requiring uninterrupted power.\n\nA Hybrid Solar System combines solar panels, battery storage, and the utility grid. During the day, solar power is used first. Excess energy charges the batteries, while the grid provides additional backup when needed.",
        points: "Reduced electricity bills\nBackup power during outages\nMaximum energy security\nSmart energy management\nGreater energy independence\nIdeal for critical business operations",
        image: null,
    },
];

function parseLines(text) {
    return (text || "").split("\n").map((s) => s.trim()).filter(Boolean);
}

function parseParagraphs(text) {
    const parts = (text || "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    return { bestFor: parts[0] || "", howItWorks: parts[1] || "" };
}

const DEFAULTS = {
    title: "Solar System Installation",
    description: "Professional Solar System Installation Services in Cambodia",
    bannerTitle: "Professional Solar System Installation Services in Cambodia",
    bannerDescription: "Reduce your electricity costs and achieve energy independence with reliable solar power solutions. Master MEP Solution provides complete solar system design, engineering, installation, and maintenance for homes, businesses, factories, and commercial buildings across Cambodia.",
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

export default function SolaSystem({ service, serviceItems = [], projects = [], heroImage = null, keyHighlights = [] }) {
    const [open, setOpen] = useState(null);
    const heroSecImage = "/HeroSection/heroSection.png";

    const bgImage = service?.image ? `/storage/${service.image}` : heroImage;
    const heroTitle = DEFAULTS.title;
    const heroDesc = DEFAULTS.description;
    const displayItems = serviceItems.length > 0 ? serviceItems : STATIC_ITEMS;
    const displayHighlights = keyHighlights.length > 0 ? keyHighlights : highlights;

    // Solar System Type cards are static (admin items only carry title/points/image,
    // not the Best For / How It Works paragraphs this section needs)
    const solarTypes = DEFAULT_SOLAR_TYPES;

    // "Our Solar Installation Services" carousel content — sourced from serviceItems (same admin-managed
    // Service Items grid used for the Solar System Type cards above), falls back to DEFAULT_SOLAR_SERVICES
    // if no items have been added yet
    const displaySolarServices = serviceItems.length > 0 ? serviceItems : DEFAULT_SOLAR_SERVICES;

    const benefitsTitle = service?.benefits_title ?? DEFAULTS.benefitsTitle;
    const benefitsPointsRaw = service?.benefits_points ?? DEFAULTS.benefitsPoints;
    const benefitsPoints = (benefitsPointsRaw || "").split("\n").map(p => p.trim()).filter(Boolean);

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
            <section className="relative min-h-[90vh] flex items-center" style={{
                    backgroundImage: `url(${bgImage || heroSecImage})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover"
                }}>
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 px-6 max-w-3xl mx-auto w-full text-white text-center">
                    <p className="text-3xl sm:text-4xl md:text-[50px] tracking-[0.1em] font-semibold text-white mb-1">MASTER MEP</p>
                    <p className="text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] text-[#96DCFF] mb-6 sm:mb-8">SOLUTION</p>
                    <Reveal delay={100}><h1 className="text-3xl md:text-5xl font-bold mb-4">{heroTitle}</h1></Reveal>
                    <Reveal delay={260}><p className="text-sm opacity-80 mb-8 max-w-xl mx-auto">{heroDesc}</p></Reveal>
                    <Reveal delay={340}>
                        <div className="flex flex-row sm:flex-row gap-4 justify-center">
                            <a href="/contact" className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">Request Free Site Survey</a>
                            <a href="/contact" className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">Get Solar Quotation</a>
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
                        Talk to Our Solar Engineer
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

            {/* Solar System Type Cards — now dynamic from service.items (fallback to DEFAULT_SOLAR_TYPES) */}
            {solarTypes.map((item, index) => {
                const { bestFor, howItWorks } = parseParagraphs(item.description);
                const benefits = parseLines(item.points);
                return (
                    <section key={index} className="py-6 sm:py-8 px-4 md:px-6 max-w-5xl mx-auto">
                        <Reveal>
                            <div className={index % 2 === 0 ? "bg-[#EAF3FC] rounded-2xl p-4 sm:p-6 md:p-8" : ""}>
                                <div className={`flex flex-col md:flex-row${index % 2 !== 0 ? "-reverse" : ""} gap-6 md:gap-8 items-stretch`}>
                                    <div className="w-full md:w-[45%] shrink-0">
                                        <div className="w-full aspect-square md:aspect-auto md:h-full rounded-xl bg-gray-300 overflow-hidden">
                                            {item.image && (
                                                <img src={item.image.startsWith?.("http") || item.image.startsWith?.("/") ? item.image : `/storage/${item.image}`} alt={item.title} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[55%]">
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A3A5C] mb-3 sm:mb-4">
                                            {item.title}
                                        </h3>

                                        <div className="mb-3 sm:mb-4">
                                            <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Best For:</p>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{bestFor}</p>
                                        </div>

                                        <div className="mb-3 sm:mb-4">
                                            <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">How It Works:</p>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{howItWorks}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Benefits</p>
                                            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                                                {benefits.map((b, i) => <li key={i}>• {b}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </section>
                );
            })}

            {/* Our Solar Installation Services — now dynamic, sourced from serviceItems (fallback to DEFAULT_SOLAR_SERVICES) */}
            <section
                className="py-12 sm:py-16 px-4 md:px-6 relative overflow-hidden"
                style={{ background: "linear-gradient(90deg, #0C2D4F 0%, #1E5BA8 100%)" }}
            >
                <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-10">
                    <Reveal>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                            Our Solar Installation Services
                        </h2>
                        <p className="text-xs sm:text-sm text-white/80">
                            Master MEP Solution provides complete turnkey solar solutions, including:
                        </p>
                    </Reveal>
                </div>

                <SolarServicesCarousel services={displaySolarServices} />
            </section>

            {/* Applications */}
            <section className="py-16 px-4 md:px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-1">Applications</h2>
                        <p className="text-orange-500 text-sm sm:text-base font-medium mb-10">
                            Our solar systems are suitable for:
                        </p>
                    </Reveal>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {[
                            "Residential Homes",
                            "Office Buildings",
                            "Factories & Industrial Facilities",
                            "Hotels & Resorts",
                            "Hospitals & Clinics",
                            "Schools & Universities",
                            "Shopping Malls",
                            "Religious Buildings",
                            "Farms & Agricultural Facilities",
                        ].map((label, i) => (
                            <Reveal delay={i * 60} key={i}>
                                <div className="bg-[#CFE7F6] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-left hover-lift w-[150px] sm:w-[170px] md:w-[180px] min-h-[72px] sm:min-h-[80px] flex items-center">
                                    <p className="text-xs sm:text-sm font-medium text-[#1A3A5C] leading-snug">{label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Master MEP Solution */}
            <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] text-center mb-10">
                        Why Choose Master MEP Solution?
                    </h2>
                </Reveal>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {[
                        "Experienced solar engineers",
                        "Customized system design",
                        "High-quality solar components",
                        "Professional installation team",
                        "Compliance with electrical safety standards",
                        "After-sales maintenance and technical support",
                        "Energy-efficient and cost-effective solutions",
                        "One-stop engineering, procurement, and installation services",
                    ].map((label, i) => (
                        <Reveal delay={i * 60} key={i}>
                            <div className="border-2 border-[#2E9BD6] rounded-2xl p-5 sm:p-6 text-center hover-lift min-h-[120px] sm:min-h-[150px] lg:min-h-[160px] flex flex-col items-center justify-center">
                                <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-2">{String(i + 1).padStart(2, "0")}</p>
                                <p className="text-xs sm:text-sm font-medium text-[#1A3A5C]">{label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Our Installation Process */}
            <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] text-center mb-10">
                        Our Installation Process
                    </h2>
                </Reveal>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
                    {[
                        { step: "Step 1", title: "Free Site Survey", desc: "Our engineers assess your roof, electrical system, and energy consumption." },
                        { step: "Step 2", title: "System Design & Proposal", desc: "We recommend the most suitable On-Grid, Off-Grid, or Hybrid solution based on your requirements." },
                        { step: "Step 3", title: "Quotation & Approval", desc: "Receive a detailed proposal outlining equipment, installation scope, estimated energy savings, and project timeline." },
                        { step: "Step 4", title: "Professional Installation", desc: "Our certified technicians install the complete solar system safely and efficiently." },
                        { step: "Step 5", title: "Testing & Commissioning", desc: "We test system performance, verify electrical safety, and provide user training." },
                        { step: "Step 6", title: "Maintenance & Technical Support", desc: "Ongoing maintenance services ensure your solar system operates at maximum efficiency for years to come." },
                    ].map((s, i) => (
                        <Reveal delay={i * 80} key={i}>
                            <div className="min-h-[150px] sm:min-h-[140px] lg:min-h-[150px]">
                                <p className="text-orange-500 font-bold text-xs sm:text-sm mb-1">{s.step}</p>
                                <p className="text-[#1A3A5C] font-bold text-xs sm:text-sm mb-2">{s.title}</p>
                                <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 leading-relaxed">{s.desc}</p>
                            </div>
                        </Reveal>
                    ))}
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
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {[
                                    { key: "s1", q: "How long does a solar system installation take?", a: "Most residential installations are completed within 3-7 days, while larger commercial or industrial projects may take 2-4 weeks depending on system size and site complexity." },
                                    { key: "s2", q: "Do I need a battery for my solar system?", a: "Not necessarily. If you're connected to a reliable grid, an On-Grid system without battery is more cost-effective. A battery is recommended if you experience frequent power outages or want energy independence." },
                                    { key: "s3", q: "How much can I save on my electricity bill with solar?", a: "Savings depend on your system size, energy consumption, and sunlight exposure. Most customers see a 30-70% reduction in monthly electricity costs after installation." },
                                ].map((faq, i) => (
                                    <Reveal delay={i * 80} key={faq.key}>
                                        <div className="bg-white rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setOpen(open === faq.key ? null : faq.key)}
                                                className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                                            >
                                                <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">{faq.q}</span>
                                                <span className="text-[#1A3A5C] shrink-0">{open === faq.key ? "▼" : "▶"}</span>
                                            </button>
                                            <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === faq.key ? "300px" : "0px" }}>
                                                <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">{faq.a}</div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 sm:gap-4">
                                {[
                                    { key: "s4", q: "What is the lifespan of a solar system, and does it need maintenance?", a: "Solar panels typically last 25-30 years with minimal maintenance. We recommend periodic panel cleaning and annual inspections to ensure optimal performance and efficiency." },
                                    { key: "s5", q: "What happens to my solar system during a power outage?", a: "For On-Grid systems, power output stops automatically for safety during a grid outage. Off-Grid and Hybrid systems with battery storage continue supplying power to your building." },
                                    { key: "s6", q: "Do you provide warranty and after-sales support?", a: "Yes, we provide warranty coverage on solar panels, inverters, and installation workmanship, along with ongoing maintenance and technical support to keep your system running efficiently." },
                                ].map((faq, i) => (
                                    <Reveal delay={240 + i * 80} key={faq.key}>
                                        <div className="bg-white rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setOpen(open === faq.key ? null : faq.key)}
                                                className="w-full flex justify-between items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                                            >
                                                <span className="text-xs sm:text-sm font-semibold text-[#1A3A5C]">{faq.q}</span>
                                                <span className="text-[#1A3A5C] shrink-0">{open === faq.key ? "▼" : "▶"}</span>
                                            </button>
                                            <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === faq.key ? "300px" : "0px" }}>
                                                <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#1A3A5C]/80 leading-relaxed">{faq.a}</div>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
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
    style={heroSecImage
        ? { backgroundImage: `url('${heroSecImage}')`, backgroundSize: "cover", backgroundPosition: "center" }
        : { background: "linear-gradient(135deg, #0C1F3F 0%, #1E5BA8 100%)" }
    }>
    <div className="absolute inset-0 bg-black/55" />
    <Reveal className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{DEFAULTS.ctaTitle}</h2>
        <p className="text-sm opacity-80 mb-8">{DEFAULTS.ctaDescription}</p>

        <div className="flex flex-row gap-2 ">
            <Link
                href="/contact"
                className="btn-animate inline-block max-[600px]:text-[10px] px-8 py-3 max-[600px]:px-2 bg-[#2E5C8A] rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
            >
                Request Free Site Survey
            </Link>
            <Link
                href="/contact"
                className="btn-animate max-[600px]:text-[10px]  inline-block px-8 py-3 bg-[#2E5C8A] max-[600px]:px-2 rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
            >
                Get Solar Quotation
            </Link>
            <Link
                href="/contact"
                className="btn-animate max-[600px]:text-[10px]  inline-block px-8 py-3 bg-[#2E5C8A] max-[600px]:px-2 rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
            >
                Talk to Our Solar Engineer
            </Link>
        </div>
    </Reveal>
</section>
        </MepLayout>
    );
}