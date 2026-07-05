import { Head, useForm } from "@inertiajs/react";
import MepLayout from "@/Layouts/MepLayout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import FadeIn from "@/Components/FadeIn";

export default function Contact({ flash = {}, heroImage = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "", phone: "", email: "", subject: "", message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/contact", { onSuccess: () => reset() });
    };
    const heroSecImage = "/HeroSection/heroSection.png";


    return (
        <MepLayout>
            <Head title="Contact Us | Master MEP Solution Cambodia">
                <meta
                    name="description"
                    content="Contact Master MEP Solution Co., Ltd for MEP engineering quotations, site inspections, and project enquiries in Phnom Penh and across Cambodia. Get in touch with our mechanical, electrical, and plumbing engineering team."
                />
                <meta
                    name="keywords"
                    content="contact MEP engineering Cambodia, MEP contractor Phnom Penh contact, request quotation MEP Cambodia"
                />
            </Head>

            {/* Hero */}
            <section
                className="relative min-h-[60vh] flex items-center overflow-hidden"
                style={{
                    backgroundImage: `url(${heroSecImage})`,
                    backgroundPosition: "center center"
                }}
            >
                {heroImage && (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2D4F]/90 via-[#0C2D4F]/70 to-[#1E5BA8]/50" />

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* Left text */}
                    <FadeIn direction="left">
                        <div className="text-white">
                            <p className="text-xs tracking-widest uppercase opacity-70 mb-3">Get In Touch</p>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-md">
                                Get in touch with our MEP engineering team for quotations, site inspections, or any project enquiries.
                            </p>
                            <div className="space-y-5">
                                {[
                                    { icon: <MapPin size={16} />, title: "Head Office", lines: ["Borey Long Ny Chamkardoung,#40, Street 01, Prakar Village,Preysar Commune, Dangkor District, Phnom Penh"] },
                                    { icon: <Phone size={16} />, title: "Phone", lines: ["017 55 22 38"] },
                                    { icon: <Mail size={16} />, title: "Email", lines: [" lensamoun68@gmail.com"] },
                                    { icon: <Clock size={16} />, title: "Business Hours", lines: ["Mon- Sat 8:00 AM - 5:00 PM"] },
                                ].map((item, i) => (
                                    <FadeIn key={i} direction="up" delay={150 + i * 100}>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{item.title}</p>
                                                {item.lines.map((line, j) => <p key={j} className="text-blue-100 text-xs">{line}</p>)}
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right - Floating Form Card (Glassmorphism) */}
                    <FadeIn direction="right" delay={150}>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                            <h2 className="text-xl font-bold text-white mb-5">Send Us a Message</h2>
                            {flash.success && (
                                <div className="bg-green-500/20 border border-green-300/40 text-green-100 px-4 py-3 rounded-lg mb-5 text-sm backdrop-blur-sm">
                                    {flash.success}
                                </div>
                            )}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1">Full Name *</label>
                                    <input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-all duration-200"
                                        placeholder="Your full name" />
                                    {errors.name && <p className="text-red-300 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-1">Phone *</label>
                                        <input type="tel" value={data.phone} onChange={(e) => setData("phone", e.target.value)}
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-all duration-200"
                                            placeholder="+855 ..." />
                                        {errors.phone && <p className="text-red-300 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-1">Email</label>
                                        <input type="email" value={data.email} onChange={(e) => setData("email", e.target.value)}
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-all duration-200"
                                            placeholder="your@email.com" />
                                        {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1">Subject *</label>
                                    <select value={data.subject} onChange={(e) => setData("subject", e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 transition-all duration-200 [&>option]:text-[#1A3A5C]">
                                        <option value="">Select a subject</option>
                                        <option value="quotation">Request Quotation</option>
                                        <option value="inspection">Book Site Inspection</option>
                                        <option value="maintenance">Maintenance Inquiry</option>
                                        <option value="general">General Inquiry</option>
                                    </select>
                                    {errors.subject && <p className="text-red-300 text-xs mt-1">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-1">Message *</label>
                                    <textarea rows={3} value={data.message} onChange={(e) => setData("message", e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/25 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 resize-none transition-all duration-200"
                                        placeholder="Describe your project or inquiry..." />
                                    {errors.message && <p className="text-red-300 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button onClick={handleSubmit} disabled={processing}
                                    className="w-full bg-white/90 hover:bg-white text-[#1A3A5C] font-semibold py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0">
                                    {processing ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </MepLayout>
    );
}