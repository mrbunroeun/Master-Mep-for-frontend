// resources/js/Pages/Maintenance.jsx
import { useState } from "react";
import MepLayout from "@/Layouts/MepLayout";
import { Head, Link, usePoll } from "@inertiajs/react";
import FadeIn from "@/Components/FadeIn";

const serviceItems = [
  {
    title: "HVAC Maintenance",
    points: [
      "Air conditioner servicing",
      "VRV/VRF maintenance",
      "Duct cleaning",
      "Filter cleaning",
      "Coil cleaning",
    ],
  },
  {
    title: "Electrical Maintenance",
    points: [
      "MDB/DB maintenance",
      "Electrical troubleshooting",
      "Lighting repair",
      "Generator maintenance",
      "Power system testing",
      "Cable inspection",
    ],
  },
  {
    title: "ELV Maintenance",
    points: [
      "CCTV maintenance",
      "Access control servicing",
      "Fire alarm testing",
      "LAN & network inspection",
      "Intercom maintenance",
      "BMS system support",
    ],
  },
  {
    title: "Plumbing Maintenance",
    points: [
      "Water leakage repair",
      "Drainage inspection",
      "Water pump maintenance",
      "Pipe replacement",
      "Water tank cleaning",
      "Plumbing troubleshooting",
    ],
  },
];

const highlights = [
  { number: "01", label: "Experienced Maintenance Team" },
  { number: "02", label: "Fast Response Support" },
  { number: "03", label: "Preventive Maintenance Planning" },
  { number: "04", label: "Multi-System Expertise" },
  { number: "05", label: "Long-Term AMC contracts" },
  { number: "06", label: "Strong After-Sales Support" },
];

const steps = [
  { number: "1", label: "Receive Service Request" },
  { number: "2", label: "Site Inspection & Diagnosis" },
  { number: "3", label: "Technical Assessment" },
  { number: "4", label: "Quotation Approval" },
  { number: "5", label: "Maintenance & Repair" },
  { number: "6", label: "Testing & Commissioning" },
  { number: "7", label: "Maintenance Report & Follow-up" },
];

const faqs = [
  { q: "Do you provide emergency maintenance services?", a: "Yes. Our team supports urgent HVAC, electrical, plumbing, and ELV troubleshooting services." },
  { q: "Do you provide annual maintenance contracts?", a: "Yes, we offer Annual Maintenance Contracts (AMC) for commercial buildings and businesses." },
  { q: "How often should HVAC systems be maintained?", a: "We recommend quarterly servicing for commercial HVAC systems and bi-annual for residential." },
  { q: "Can you maintain systems installed by other contractors?", a: "Yes, we can assess and maintain MEP systems regardless of who installed them." },
  { q: "Which areas do you serve?", a: "We serve Phnom Penh, Siem Reap, and other provinces across Cambodia." },
];

// Static fallback for the Benefits section
const defaultBenefit = {
  title: "Benefits of Professional Plumbing Systems",
  points: [
    "Reliable water supply",
    "Efficient drainage systems",
    "Reduce water leakage risks",
    "Long-term durability",
    "Better hygiene & sanitation",
    "Lower maintenance costs",
  ],
  image: null,
};

export default function Maintenance({
  service = null,
  maintenanceFeatures = [],
  maintenanceCategories = [],
  maintenanceBenefit = null,
  maintenanceContract = null,
  heroImage = null,

}) {
  const [open, setOpen] = useState(null);

  // Auto-refresh data from server every 10s without a full page reload
  usePoll(10000);

  const displayedCategories =
    maintenanceCategories.length > 0 ? maintenanceCategories : serviceItems;

  function getPoints(item) {
    if (Array.isArray(item.points)) return item.points;
    if (typeof item.points === "string") {
      return item.points.split("\n").filter((p) => p.trim() !== "");
    }
    return [];
  }

  const heroTitle = service?.title || "MEP Maintenance";
  const heroDescription =
    service?.description ||
    "From MEP maintenance contracts to individual preventive maintenance services for commercial buildings, banks, hospitals, retail stores, and industrial facilities, Master MEP provides comprehensive maintenance and emergency troubleshooting services to minimize downtime and improve building system performance.";

  const resolvedHeroImage = service?.image ? `/storage/${service.image}` : heroImage;

  const bgStyle = resolvedHeroImage
    ? { backgroundImage: `url('${resolvedHeroImage}')` }
    : { background: "linear-gradient(135deg, #0C1F3F 0%, #1A3A5C 50%, #1E5BA8 100%)" };

  return (
    <MepLayout>
      <Head title="MEP Maintenance — Master MEP" />

      <style>{`
        .hover-lift {
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(12, 31, 63, 0.25);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .btn-animate {
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background-color 0.2s ease-out;
        }
        .btn-animate:hover {
          transform: translateY(-2px) scale(1.03);
        }
        .btn-animate:active {
          transform: scale(0.97);
        }
        @media (prefers-reduced-motion: reduce) {
          .hover-lift:hover,
          .btn-animate:hover,
          .btn-animate:active {
            transform: none;
          }
        }
      `}</style>

      {/* Hero */}
      <section
        className="relative min-h-[70vh] bg-cover bg-center flex items-center"
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto w-full text-white text-center">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase opacity-70 mb-2">MASTER MEP</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={180}>
            <p className="text-sm opacity-70 mb-4">
              Professional MEP Maintenance Services in Cambodia
            </p>
          </FadeIn>
          <FadeIn delay={260}>
            <p className="text-sm opacity-80 mb-8 max-w-xl mx-auto">
              {heroDescription}
            </p>
          </FadeIn>
          <FadeIn delay={340}>
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

      {/* Intro Banner */}
      <FadeIn>
        <section
          className="text-white text-center px-6 py-10 mx-4 md:mx-16 rounded-2xl -mt-10 relative z-10"
          style={{ background: "linear-gradient(to right, #0C2D4F, #1E5BA8)" }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Reliable Maintenance Solutions for Long-Term Building Performance
          </h2>
          <p className="text-sm opacity-90 max-w-3xl mx-auto leading-relaxed">
            From MEP maintenance contracts to individual preventive maintenance services for commercial
            buildings, banks, hospitals, villas, and retail spaces. Master MEP provides on-site
            maintenance services to minimize downtime and improve building system performance.
          </p>
        </section>
      </FadeIn>

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-6 max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-8">
            Maintenance Services Include:
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {displayedCategories.map((item, i) => (
            <FadeIn key={item.id ?? item.title} delay={i * 80}>
              <div className="hover-lift flex flex-col gap-3 bg-blue-50 rounded-2xl p-4">
                {item.image ? (
                  <div
                    className="rounded-xl aspect-square w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('/storage/${item.image}')` }}
                  />
                ) : (
                  <div className="bg-gray-300 rounded-xl aspect-square w-full" />
                )}
                <h3 className="text-sm font-bold text-orange-500">{item.title}</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  {getPoints(item).map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

{/* Benefits */}
<section className="bg-[#1A3A5C]/5 py-16 px-4 md:px-6">
  <FadeIn>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <img
          src="/image/whychoos1.jpg"
          alt="Benefits of Professional Plumbing Systems"
          className="hover-lift w-full aspect-[4/3] object-cover rounded-xl"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-4">
          Benefits of Professional Plumbing Systems
        </h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Reliable water supply</li>
          <li>• Efficient drainage systems</li>
          <li>• Reduce water leakage risks</li>
          <li>• Long-term durability</li>
          <li>• Better hygiene & sanitation</li>
          <li>• Lower maintenance costs</li>
        </ul>
      </div>
    </div>
  </FadeIn>
</section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto text-center">
              <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A3A5C] mb-2 text-center">Why Choose Us</h2>
          <p className="text-orange-500 text-base font-bold mb-10 text-center">
            Why Businesses Choose Master MEP for Maintenance
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <FadeIn key={item.number} delay={i * 70}>
              <div className="hover-lift border-2 border-[#2E5C8A] rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-orange-500 mb-2">{item.number}</p>
                <p className="text-sm font-medium text-[#1A3A5C]">{item.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Maintenance Gallery */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <FadeIn>
          <h2 className="text-xl md:text-2xl font-bold text-[#124d8d] mb-1">
            Featured Maintenance Gallery
          </h2>
          <p className="text-orange-500 text-sm font-medium mb-8">
            Our maintenance team supports commercial buildings, banks, restaurants, offices, and retail
            spaces with professional on-site maintenance services throughout Cambodia.
          </p>
        </FadeIn>

        {maintenanceFeatures.length === 0 ? (
          <FadeIn>
            <p className="text-sm text-gray-500">No maintenance projects added yet.</p>
          </FadeIn>
        ) : (
          <div className="flex flex-col gap-6">
            {maintenanceFeatures.map((item, i) => (
              <FadeIn key={item.id} delay={i * 80}>
                <div
                  className="hover-lift rounded-2xl overflow-hidden flex flex-col md:flex-row gap-6 p-4 md:p-6 items-stretch"
                  style={{ background: "linear-gradient(135deg, #1A56C4 0%, #1E5BA8 100%)" }}
                >
                  <div
                    className="md:w-2/5 rounded-xl bg-gray-400 bg-cover bg-center shrink-0 self-stretch min-h-[180px]"
                    style={
                      item.image
                        ? { backgroundImage: `url('/storage/${item.image}')` }
                        : undefined
                    }
                  />
                  <div className="flex-1 text-white py-2">
                    <h3 className="text-lg md:text-xl font-bold mb-4">{item.title}</h3>
                    {item.scope && (
                      <>
                        <p className="text-xs opacity-80 mb-1 font-semibold uppercase tracking-wide">
                          Scope of work:
                        </p>
                        <ul className="text-sm opacity-90 space-y-1 mb-4">
                          {item.scope
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                        </ul>
                      </>
                    )}
                    {item.location && (
                      <p className="text-xs opacity-75">Location: {item.location}</p>
                    )}
                    {item.timeline && (
                      <p className="text-xs opacity-75">Timeline: {item.timeline}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Maintenance Workflow */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-1">
              Maintenance Workflow
            </h2>
            <p className="text-orange-500 text-sm font-medium mb-8">Our Maintenance Process</p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 60}>
                <div className="hover-lift bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#1A3A5C] rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                    {step.number}
                  </div>
                  <p className="text-xs text-gray-600">{step.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
   {/* AMC Section */}
<section className="bg-gradient-to-br from-[#1A3A5C] to-[#2E6FBF] py-16 px-4 md:px-6">
  <FadeIn>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Maintenance Contract
        </h2>
        <p className="text-orange-500 text-base font-semibold mb-4">
          Annual Maintenance Contracts (AMC)
        </p>
        <p className="text-sm text-gray-100 mb-4 leading-relaxed">
          Master MEP provides Annual Maintenance Contracts (AMC) for commercial buildings and businesses requiring scheduled preventive maintenance and priority technical support.
        </p>
        <ul className="text-sm text-gray-100 space-y-2">
          <li>• Monthly inspections</li>
          <li>• Quarterly servicing</li>
          <li>• Emergency support</li>
          <li>• System performance reports</li>
          <li>• Scheduled maintenance planning</li>
        </ul>
      </div>

      <div
        className="md:w-1/3 rounded-lg aspect-square w-full bg-cover bg-center bg-gray-200"
        style={{ backgroundImage: `url('/images/maintenance/amc.jpg')` }}
      />
    </div>
  </FadeIn>
</section>
      {/* FAQs */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-8">FAQs</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="hover-lift bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex justify-between items-center px-5 py-4 text-sm font-medium text-gray-800 text-left"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#2E5C8A] ml-2 shrink-0 transition-transform duration-200">
                      {open === i ? "▲" : "▶"}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{ maxHeight: open === i ? "300px" : "0px" }}
                  >
                    <div className="px-5 pb-4 text-sm text-gray-600">{faq.a}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-20 bg-cover bg-center text-white text-center"
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-black/60" />
        <FadeIn className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Need Reliable MEP Maintenance Support?
          </h2>
          <p className="text-sm opacity-80 mb-8">
            Get reliable maintenance services for your HVAC, electrical, plumbing, and ELV systems
            from Master MEP Solution Co., Ltd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
             className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm"
            >
              Request Maintenance Service
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-900 rounded-xl hover:bg-blue-800 transition font-medium text-sm"
            >
              Contact Maintenance Team
            </Link>
          </div>
        </FadeIn>
      </section>
    </MepLayout>
  );
}