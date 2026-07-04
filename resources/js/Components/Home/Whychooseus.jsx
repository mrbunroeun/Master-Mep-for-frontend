export default function Whychooseus() {
    const sectionTitle = "Why Choose Master MEP";
    const mainDesc =
        "Master MEP Solution Co., Ltd combines technical expertise, reliable project delivery, and a client-first approach to bring your mechanical, electrical, and plumbing projects to life — on time and to the highest standard.";
    const sectionImage = "/image/whychoos.jpg";

    return (
        <section className="py-20" style={{ backgroundColor: '#E1EFFB' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Image */}
                    <div className="relative">
                        <div className="bg-gray-200/60 rounded-2xl p-4 h-[320px] flex items-center justify-center">
                            <div className="overflow-hidden rounded-xl w-full h-full shadow-lg">
                                <img
                                    src={sectionImage}
                                    alt="Why Choose Master MEP"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#1A3A5C] flex items-center justify-center shadow-lg">
                            <span className="text-orange-500 font-black text-3xl leading-none select-none">!</span>
                        </div>
                    </div>

                    {/* Right: Title + Paragraph */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A3A5C] mb-4">{sectionTitle}</h2>
                        <p className="text-gray-700 leading-relaxed">{mainDesc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}