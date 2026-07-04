import FadeIn from "@/Components/FadeIn";

export default function Ctabanner({ ctaBanner, heroImage }) {
  const backgroundImage = heroImage || "/images/hero.jpg";

  return (
    <section
      className="relative py-20 bg-cover bg-center text-white text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <FadeIn className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {ctaBanner?.title || ''}
        </h2>
        <p className="text-sm md:text-base opacity-80">
          {ctaBanner?.description || 'Master MEP has worked with leading brands, banks, restaurants, hospitals, retail stores, and commercial developers in Cambodia.'}
        </p>
      </FadeIn>
    </section>
  );
}