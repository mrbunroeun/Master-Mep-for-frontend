import FadeIn from "@/Components/FadeIn";

const keyHighlights = [
  { number: 1, title: "Experienced MEP Engineering Team" },
  { number: 2, title: "Fast Project Timeline Management" },
  { number: 3, title: "Quality & Compliance Standards" },
  { number: 4, title: "Cost-Effective Engineering Solutions" },
  { number: 5, title: "Energy-Efficient System Design" },
  { number: 6, title: "1-Year Warranty Support" },
  { number: 7, title: "In-House Maintenance Team" },
  { number: 8, title: "5% project payment deposit at the customer" },
];

export default function Keyhighlights({
  title = "Key Highlights",
  subtitle = null,
}) {
  return (
    <section className="bg-gradient-to-r from-[#003b7a] via-[#005c99] to-[#044b74]  py-20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center text-white text-4xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-center text-orange-400 text-sm font-medium mb-12">{subtitle}</p>
          )}
          {!subtitle && <div className="mb-12" />}
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {keyHighlights.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-orange-400 text-5xl font-bold">
                  {String(item.number).padStart(2, "0")}
                </h3>
                <p className="text-white mt-2">{item.title}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}