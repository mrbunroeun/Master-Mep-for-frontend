import MepLayout from "@/Layouts/MepLayout";
import { Head, Link } from "@inertiajs/react";
import FadeIn from "@/Components/FadeIn";

// Handles image paths whether stored as "insights/file.jpg" or already "/storage/insights/file.jpg"
const storageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/storage/')) return path;
    return `/storage/${path}`;
};

export default function InsightDetail({ insight }) {
    const slugSource = insight.slug || insight.url || "";
    const heroSecImage = "/HeroSection/heroSection.png";

    const isBlackTheme = String(slugSource)

        .toLowerCase()
        .includes("how-to-choose-mep");

    return (
        <MepLayout>
            <Head title={`${insight.title} — Master MEP`} />

            {/* Hero */}
            <section
                className="relative min-h-[40vh] flex items-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroSecImage})`,
                    backgroundPosition: "center center"
                }}
            >
                <div
                    className="absolute inset-0 bg-black/50"

                />
                <FadeIn direction="up" className="relative z-10 px-6 max-w-3xl mx-auto w-full text-white text-center">
                    <p className="text-xs tracking-widest uppercase opacity-70 mb-2">MASTER MEP SOLUTION</p>
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">{insight.title}</h1>
                    <div className="flex gap-4 justify-center mt-6">
                        <Link href="/contact" className="px-6 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition text-sm font-medium">
                            Request Quotation
                        </Link>
                        <Link href="/contact" className="px-6 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition text-sm font-medium">
                            Book Site Inspection
                        </Link>
                    </div>
                </FadeIn>
            </section>

            {/* Introduction */}
            <FadeIn direction="up">
                <section
                    className="text-white text-center px-6 py-10 mx-4 md:mx-16 rounded-2xl -mt-10 relative z-10"
                    style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
                >
                    <h2 className="text-xl md:text-2xl font-bold mb-3">Introduction</h2>
                    <p className="text-sm opacity-90 max-w-3xl mx-auto leading-relaxed">
                        {insight.introduction}
                    </p>
                </section>
            </FadeIn>

            {/* Back to Insights */}
            <div className="px-4 md:px-6 max-w-5xl mx-auto pt-6">
                <Link
                    href="/insights"
                    className="group inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full
                   text-sm font-medium text-white bg-[#2E5C8A]
                   hover:bg-[#1A3A5C] hover:shadow-md
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5C8A]/40 focus-visible:ring-offset-2
                   transition-all duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Insights
                </Link>
            </div>
            {/* Section Title */}
            {insight.sections_title && (
                <FadeIn direction="up">
                    <section className="pt-16 px-4 md:px-6 max-w-5xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-0">
                            {insight.sections_title}
                        </h2>
                    </section>
                </FadeIn>
            )}

            {/* Content Sections */}
            <section className={`py-16 px-4 md:px-6 ${isBlackTheme ? "bg-black" : ""}`}>
                <div className="max-w-5xl mx-auto space-y-16">
                    {insight.sections?.map((section, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <FadeIn key={i} direction={isEven ? "left" : "right"}>
                                <div className={`flex flex-col md:flex-row gap-8 items-center ${!isEven ? "md:flex-row-reverse" : ""}`}>
                                    <div className="flex-1">
                                        <h3 className="text-orange-500 font-bold text-base mb-2">
                                            {section.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed ${isBlackTheme ? "text-gray-300" : "text-gray-600"}`}>
                                            {section.body}
                                        </p>
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        {section.image ? (
                                            <img
                                                src={storageUrl(section.image)}
                                                alt={section.title}
                                                className="rounded-lg w-full max-w-[345px] object-cover shadow-sm"
                                                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                                            />
                                        ) : null}
                                        <div
                                            className={`rounded-lg w-full max-w-[345px] aspect-[4/3] items-center justify-center ${isBlackTheme ? "bg-gray-800" : "bg-gradient-to-br from-[#1A3A5C]/5 to-[#2E5C8A]/10"
                                                } ${section.image ? "hidden" : "flex"}`}
                                        >
                                            <svg
                                                className={`w-12 h-12 ${isBlackTheme ? "text-[#1A3A5C]/40" : "text-[#1A3A5C]/25"}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10.5M3 16.5l4.5-4.5a1.5 1.5 0 0 1 2.12 0l2.38 2.38m0 0 3-3a1.5 1.5 0 0 1 2.12 0L21 16.5M3 16.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5M8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </section>

            {/* Highlight Box */}
            {insight.highlight && (
                <section className="py-16 px-4 md:px-6 bg-blue-50">
                    <FadeIn direction="scale" className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            !
                        </div>
                        {isBlackTheme && (
                            <div className="flex-shrink-0 w-full md:w-64 aspect-[4/3] rounded-2xl bg-gray-200 p-3">
                                <img
                                    src="/image/whychoos.jpg"
                                    alt={insight.highlight.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#1A3A5C]">
                                {insight.highlight.title}
                            </h3>
                            <p className="leading-relaxed text-gray-600">
                                {insight.highlight.body}
                            </p>
                        </div>
                    </FadeIn>
                </section>
            )}

            {/* CTA */}
            <section
                className="relative py-20 bg-cover bg-no-repeat text-white text-center"
                style={{
                    backgroundImage: `url(${heroSecImage})`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="absolute inset-0 bg-black/30" />

                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)"
                    }}
                />
                <FadeIn direction="up" className="relative z-10 max-w-2xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{insight.cta_text}</h2>
                    <Link href="/contact" className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm">
                        Contact Master MEP
                    </Link>
                </FadeIn>
            </section>
        </MepLayout>
    );
}