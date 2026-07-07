import { useState } from "react";
import MepLayout from "@/Layouts/MepLayout";
import { Head, Link } from "@inertiajs/react";
import FadeIn from "@/Components/FadeIn";

export default function LatestActivityShow({ activity }) {
    const [open, setOpen] = useState(null);
    const heroSecImage = "/HeroSection/heroSection.png";

    const bgImage = activity?.image || heroSecImage;

    const images = [
        activity?.image,
        activity?.image,
        activity?.image,
        activity?.image,
    ];

    return (
        <MepLayout>
            <Head title={`${activity.title} — Master MEP`} />

            {/* Hero */}
            <section
                className="relative min-h-[50vh] flex items-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundPosition: "center center"
                }}
            >
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 px-6 max-w-3xl mx-auto w-full text-white text-center">
                    <FadeIn delay={0}>
                        <p className="text-xs tracking-widest uppercase opacity-70 mb-3">Latest Activity</p>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{activity.title}</h1>
                        <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm opacity-90">
                            {activity.category && (
                                <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                    {activity.category}
                                </span>
                            )}
                            {activity.date && (
                                <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                    {activity.date}
                                </span>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Introduction */}
            <FadeIn direction="up">
                <section
                    className="text-white text-center px-6 py-10 mx-4 md:mx-16 rounded-2xl -mt-10 relative z-10"
                    style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
                >
                    <h2 className="text-xl md:text-2xl font-bold mb-3">Activity Overview</h2>
                    <p className="text-sm opacity-90 max-w-3xl mx-auto leading-relaxed">
                        {activity.excerpt}
                    </p>
                </section>
            </FadeIn>

            {/* Back Button */}
            <div className="px-4 md:px-6 max-w-5xl mx-auto pt-6">
                <Link
                    href="/latestactivities"
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
                    Back to Latest Activities
                </Link>
            </div>

            {/* Gallery — 4 images in 2 columns */}
            <section className="py-12 sm:py-16 px-4 md:px-6 max-w-5xl mx-auto">
                <FadeIn direction="up">
                    <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-6 text-center">Project Gallery</h2>
                </FadeIn>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {images.map((src, i) => (
                        <FadeIn key={i} delay={i * 100}>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
                                {src ? (
                                    <img
                                        src={src}
                                        alt={`${activity.title} - ${i + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6v10.5a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        <span className="text-[10px] sm:text-xs font-medium">Image coming soon</span>
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* Details Text */}
            <section className="py-12 sm:py-16 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <FadeIn direction="up">
                        <div className="bg-[#CFE7F6] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-4">About This Activity</h2>
                            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                                <p>{activity.excerpt}</p>
                                <p>
                                    Our team at Master MEP Solution is committed to delivering high-quality MEP engineering, 
                                    installation, and maintenance services across Cambodia. This activity reflects our ongoing 
                                    dedication to excellence, safety, and customer satisfaction.
                                </p>
                                <p>
                                    For more information about our services or to discuss your project requirements, 
                                    please feel free to contact us. Our experienced engineers are ready to assist you 
                                    with professional solutions tailored to your needs.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-16 sm:py-20 text-center bg-[#CFE7F6]" style={{
                backgroundImage: `url(${heroSecImage})`,
                backgroundPosition: "center center"
            }}>
                <div className="absolute inset-0 bg-black/55" />

                <FadeIn className="relative z-10 max-w-2xl mx-auto px-6">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#d6d6d6]">
                        Want to Work With Us on Your Next Project?
                    </h2>
                    <p className="text-sm text-[#d3d3d3] mb-8">
                        Contact Master MEP Solution for professional MEP engineering, installation, and maintenance services in Cambodia.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 bg-[#1A3A5C] text-white rounded-xl hover:bg-[#275587] transition-colors font-medium text-sm"
                    >
                        Contact Us
                    </Link>
                </FadeIn>
            </section>
        </MepLayout>
    );
}
