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
    title: "Solar System Installation",
    description: "Professional Solar System Installation Services in Cambodia",
    bannerTitle: "Professional Solar System Installation Services in Cambodia",
    bannerDescription: "Reduce your electricity costs and achieve energy independence with reliable solar power solutions. Master MEP Solution provides complete solar system design, engineering, installation, and maintenance for homes, businesses, factories, and commercial buildings across Cambodia.",
    overviewLabel: "Electrical & ELV\nSystem Services",
    overviewDescription: "Professional power distribution, lighting, CCTV, fire alarm, access control, LAN cabling, and BMS installation services for commercial and industrial projects.",
    overviewButton: "Request HVAC Consultation",
    benefitsTitle: "Benefits of Professional Electrical Systems",
    benefitsPoints: "Improve operational safety\nReliable power distribution\nBetter security systems\nEnergy-efficient lighting\nReduced downtime risks\nLong-term building reliability",
    ctaTitle: "Looking for Reliable Electrical & ELV Installation?",
    ctaDescription: "Contact Master MEP today for professional electrical engineering and maintenance services in Cambodia.",
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                        className="inline-block px-6 text-black mt-[1rem] sm:px-8 py-2.5 sm:py-3 bg-white rounded-xl hover:bg-blue-800 hover:text-white transition font-medium text-xs sm:text-sm"
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
            {/* Solar System Type Card */}
            <section className="py-6 sm:py-8 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <div className="bg-[#EAF3FC] rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                            {/* Left: image - 45%, matches text height */}
                            {/* Left: image - 45%, near-square on mobile, matches text height on desktop */}
                            <div className="w-full md:w-[45%] shrink-0">
                                <div className="w-full aspect-square md:aspect-auto md:h-full rounded-xl bg-gray-300 overflow-hidden">
                                    {/* Replace with actual image */}
                                    {/* <img src="/image/on-grid-solar.jpg" alt="On-Grid Solar System" className="w-full h-full object-cover" /> */}
                                </div>
                            </div>

                            {/* Right: content - 55% */}
                            <div className="w-full md:w-[55%]">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A3A5C] mb-3 sm:mb-4">
                                    On-Grid Solar System (No Battery)
                                </h3>

                                <div className="mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Best For:</p>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        Homes, offices, commercial buildings, schools, factories, and businesses with reliable electricity from the national grid.
                                    </p>
                                </div>

                                <div className="mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">How It Works:</p>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        An On-Grid Solar System generates electricity during the day to power your building. Any additional electricity can be exported to the utility grid (subject to local regulations), helping reduce your monthly electricity bills.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Benefits</p>
                                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                                        <li>• Lower electricity costs</li>
                                        <li>• No battery maintenance</li>
                                        <li>• Higher energy efficiency</li>
                                        <li>• Lower installation cost</li>
                                        <li>• Environmentally friendly</li>
                                        <li>• Ideal for daytime electricity usage</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
            {/* Solar System Type Card - Off-Grid */}
            <section className="py-6 sm:py-8 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-stretch">
                        {/* Right: image - 45% */}
                        <div className="w-full md:w-[45%] shrink-0">
                            <div className="w-full aspect-square md:aspect-auto md:h-full rounded-xl bg-gray-300 overflow-hidden">
                                {/* Replace with actual image */}
                                {/* <img src="/image/off-grid-solar.jpg" alt="Off-Grid Solar System" className="w-full h-full object-cover" /> */}
                            </div>
                        </div>

                        {/* Left: content - 55% */}
                        <div className="w-full md:w-[55%]">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A3A5C] mb-3 sm:mb-4">
                                Off-Grid Solar System (Battery Storage)
                            </h3>

                            <div className="mb-3 sm:mb-4">
                                <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Best For:</p>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    Remote villages, farms, construction sites, telecommunication stations, resorts, and locations without access to the electricity grid.
                                </p>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">How It Works:</p>
                                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    An Off-Grid Solar System stores solar energy in batteries, allowing electricity to be used day and night without relying on the national power grid.
                                </p>
                            </div>

                            <div>
                                <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Benefits</p>
                                <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                                    <li>• Complete energy independence</li>
                                    <li>• Reliable power in remote areas</li>
                                    <li>• Battery backup during cloudy days</li>
                                    <li>• Suitable for rural developments</li>
                                    <li>• Continuous electricity supply</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
            {/* Solar System Type Card - Hybrid */}
            <section className="py-6 sm:py-8 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <div className="bg-[#EAF3FC] rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                            {/* Left: image - 45% */}
                            <div className="w-full md:w-[45%] shrink-0">
                                <div className="w-full aspect-square md:aspect-auto md:h-full rounded-xl bg-gray-300 overflow-hidden">
                                    {/* Replace with actual image */}
                                    {/* <img src="/image/hybrid-solar.jpg" alt="Hybrid Solar System" className="w-full h-full object-cover" /> */}
                                </div>
                            </div>

                            {/* Right: content - 55% */}
                            <div className="w-full md:w-[55%]">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A3A5C] mb-3 sm:mb-4">
                                    Hybrid Solar System (Grid + Battery)
                                </h3>

                                <div className="mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Best For:</p>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        Businesses, hospitals, hotels, factories, offices, villas, and customers requiring uninterrupted power.
                                    </p>
                                </div>

                                <div className="mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">How It Works:</p>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        A Hybrid Solar System combines solar panels, battery storage, and the utility grid. During the day, solar power is used first. Excess energy charges the batteries, while the grid provides additional backup when needed.
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm sm:text-base font-semibold text-[#1A3A5C] mb-1">Benefits</p>
                                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                                        <li>• Reduced electricity bills</li>
                                        <li>• Backup power during outages</li>
                                        <li>• Maximum energy security</li>
                                        <li>• Smart energy management</li>
                                        <li>• Greater energy independence</li>
                                        <li>• Ideal for critical business operations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
         
          

            {/* Benefits — static image */}
            <section className="bg-[#1A3A5C]/5 py-16 px-4 md:px-6">
                <Reveal>
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-[380px] shrink-0 bg-gray-100 rounded-2xl p-3">
                            <img
                                src="/image/whychoos1.jpg"
                                alt={heroTitle}
                                className="hover-lift w-full aspect-[4/3] object-cover rounded-xl"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-4">{benefitsTitle}</h2>
                            <ul className="text-sm text-gray-600 space-y-2">
                                {benefitsPoints.map((p, i) => <li key={i}>• {p}</li>)}
                            </ul>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Why Choose Us — dynamic from DB (key_highlights table, type=electrical) */}
            <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
                <Reveal>
                    <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-1 text-center">Why Choose Us</h2>
                    <p className="text-orange-500 text-sm font-medium mb-8 text-center">Why Choose Master MEP for Electrical Engineering?</p>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {displayHighlights.map((item, i) => (
                        <Reveal key={item.id ?? item.number} delay={i * 70}>
                            <div className="hover-lift border-2 border-[#2E5C8A] rounded-xl p-6 text-center">
                                <p className="text-4xl font-extrabold text-orange-500 mb-2">{item.number}</p>
                                <p className="text-sm font-medium text-[#1A3A5C]">{item.title ?? item.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
                    <Reveal>
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-1">Featured Projects</h2>
                        <p className="text-orange-500 text-sm font-medium mb-8">Banks & Fuel Industrial Projects</p>
                    </Reveal>

                    {/* Group by category */}
                    {(() => {
                        const grouped = featuredProjects.reduce((acc, p) => {
                            const cat = p.category || "General";
                            if (!acc[cat]) acc[cat] = [];
                            acc[cat].push(p);
                            return acc;
                        }, {});

                        return Object.entries(grouped).map(([category, items], groupIdx) => (
                            <div key={category} className={groupIdx > 0 ? "mt-12" : ""}>
                                <Reveal>
                                    <h3 className="text-base font-bold text-[#1A3A5C] mb-1">{category}</h3>
                                    <div className="w-8 h-0.5 bg-orange-500 mb-6" />
                                </Reveal>

                                <div className="space-y-5">
                                    {items.map((project, idx) => {
                                        const { ytId, bg, scopeItems } = getFeaturedDisplay(project);
                                        return (
                                            <Reveal key={project.id || idx} delay={idx * 80}>
                                                <div
                                                    className="text-white rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                                                    style={{ background: "linear-gradient(135deg, #0C2D4F 0%, #1E5BA8 100%)" }}
                                                >
                                                    {/* Image — full height, no padding */}
                                                    <div className="w-full md:w-2/5 flex-shrink-0 min-h-[240px] md:min-h-[260px] overflow-hidden">
                                                        {bg ? (
                                                            <img
                                                                src={bg}
                                                                alt={project.title}
                                                                className="w-full h-full object-cover"
                                                                style={{ minHeight: "240px" }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center gap-3"
                                                                style={{ background: "linear-gradient(135deg, #0C2D4F 0%, #1E5BA8 100%)" }}>
                                                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                                                    <Zap size={32} className="text-white/40" />
                                                                </div>
                                                                <p className="text-white/30 text-xs font-medium tracking-wide uppercase">No Image Yet</p>
                                                            </div>
                                                        )}
                                                        {ytId && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="text-base md:text-lg font-bold mb-4 leading-snug">
                                                                {project.title}
                                                            </h3>
                                                            {scopeItems.length > 0 && (
                                                                <>
                                                                    <p className="text-sm font-semibold mb-2">Scope of work:</p>
                                                                    <div className="text-xs md:text-sm opacity-85 space-y-1 mb-5">
                                                                        {scopeItems.map((s, i) => (
                                                                            <p key={i}>{s}</p>
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )}
                                                            <div className="flex flex-col gap-1 text-xs opacity-70">
                                                                {project.location && <p>Location : {project.location}</p>}
                                                                {project.timeline && <p>Timeline: {project.timeline}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        ));
                    })()}

                    <Reveal>
                        <div className="text-center mt-10">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A5C] hover:bg-[#0C2D4F] text-white rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                View All Projects →
                            </Link>
                        </div>
                    </Reveal>
                </section>
            )}

            {/* Process */}
            <section className="py-16 px-4 md:px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-1">Process / Workflow</h2>
                        <p className="text-orange-500 text-base font-bold leading-snug mb-12">Our Electrical<br />Engineering Process</p>
                    </Reveal>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
                        {steps.map((step, i) => (
                            <Reveal key={step.number} delay={i * 60}>
                                <div
                                    className="relative bg-[#CFE7F6] rounded-2xl pt-10 pb-6 px-3 text-center hover-lift
                                                w-[160px] sm:w-[190px] md:w-[200px]"
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#0C2D4F] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {step.number}
                                    </div>
                                    <p className="text-sm font-medium text-[#1A3A5C]">{step.label}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <Reveal><h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-8">FAQs</h2></Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {staticFaqs.map((faq, i) => (
                            <Reveal key={i} delay={i * 60}>
                                <div className="hover-lift bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <button onClick={() => setOpen(open === i ? null : i)}
                                        className="w-full flex justify-between items-center px-5 py-4 text-sm font-medium text-gray-800 text-left">
                                        <span>{faq.q}</span>
                                        <span className="text-[#2E5C8A] ml-2 shrink-0">{open === i ? "▲" : "▶"}</span>
                                    </button>
                                    <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: open === i ? "300px" : "0px" }}>
                                        <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
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
                    <Link
                        href="/contact"
                        className="btn-animate inline-block px-8 py-3 bg-[#2E5C8A] rounded-xl hover:bg-[#1A3A5C] transition-colors font-medium text-sm"
                    >
                        {ctaButton}
                    </Link>
                </Reveal>
            </section>
        </MepLayout>
    );
}