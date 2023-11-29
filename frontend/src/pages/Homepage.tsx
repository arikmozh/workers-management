import Contact from "@/components/Contact";
import FeaturesSection from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import { Navbar } from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";

const Homepage = () => {
  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturesSection />
      <Pricing />
      <Contact />
      <Logos />
      <Footer />
    </div>
  );
};

export default Homepage;
