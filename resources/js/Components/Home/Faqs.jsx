import { useState } from "react";
import FadeIn from "@/Components/FadeIn";

const staticFaqs = [
  { q: "What is MEP engineering?", a: "MEP engineering refers to Mechanical, Electrical, and Plumbing systems used in modern buildings." },
  { q: "Which areas in Cambodia do you serve?", a: "We serve Phnom Penh, Siem Reap, Kampot, and other provinces across Cambodia." },
  { q: "What services does Master MEP provide?", a: "We provide HVAC, electrical, ELV, plumbing, fire protection, and maintenance services." },
  { q: "Do you provide free on-site consultations?", a: "Yes, we offer free initial consultations and site inspections." },
  { q: "What types of projects do you work on?", a: "We work on commercial buildings, villas, hospitals, banks, restaurants, and industrial facilities." },
  { q: "Why should clients choose Master MEP?", a: "We combine international standards, experienced engineers, and reliable project delivery." },
];

export default function Faqs({ faqs = [] }) {
  const [open, setOpen] = useState(null);

  const list = faqs.length > 0
    ? faqs.map((f) => ({ q: f.question, a: f.answer }))
    : staticFaqs;

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 max-w-[1800px] mx-auto bg-blue-50">
      <div className="max-w-[800px] w-full mx-auto">
        <FadeIn>
          <h2 className="text-xl md:text-2xl font-bold text-[#1A3A5C] mb-6 md:mb-8">
            FAQs
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
          {list.map((faq, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-md">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center px-4 md:px-5 py-3 md:py-4 text-sm font-medium text-gray-800 text-left"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#2E5C8A] ml-2 shrink-0 transition-transform duration-300" style={{ transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}>
                    ▶
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: open === i ? "300px" : "0px" }}
                >
                  <div className="px-4 md:px-5 pb-4 text-sm text-gray-600">
                    {faq.a}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}