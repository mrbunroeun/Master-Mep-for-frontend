import MepLayout from "@/Layouts/MepLayout";
import { Head } from "@inertiajs/react";
import Hero from "@/Components/Home/Hero";
import About from "@/Components/Home/About";
import Services from "@/Components/Home/Services";
import Whychooseus from "@/Components/Home/Whychooseus";
import Keyhighlights from "@/Components/Home/Keyhighlights";
import Projects from "@/Components/Home/Projects";
import Faqs from "@/Components/Home/Faqs";
import Ctabanner from "@/Components/Home/Ctabanner";

export default function Home({
    about,
    services,
    servicesHeader,
    serviceItems = [],
    projects,
    faqs,
    keyHighlights,
    ctaBanner,
    heroImage,
    whyChooseUs
}) {
    return (
        <MepLayout>
            <Head title="Master MEP Solution | MEP Engineering Company in Cambodia">
                {/* meta tags */}
            </Head>

            <Hero />
            <About />
            <Services services={services} serviceItems={serviceItems} pageHeader={servicesHeader} />
            <Whychooseus whyChooseUs={whyChooseUs} />
            <Keyhighlights />
            <Projects projects={projects} />
            <Faqs faqs={faqs} />
            <Ctabanner ctaBanner={ctaBanner} heroImage={heroImage} />
        </MepLayout>
    );
}