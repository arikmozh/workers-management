import Contact from "@/components/Contact";
import FeaturesSection from "@/components/Features";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import { Navbar } from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import { CubeIcon } from "@radix-ui/react-icons";

const Homepage = () => {
  return (
    <>
      <div className="overflow-y-hidden">
        <Navbar />
        <Hero />
        <Stats />
        <FeaturesSection />
        <Pricing />
        <Contact />
        <Logos />
        <footer className=" p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-sm flex items-center gap-4">
                <CubeIcon className="h-6 w-6 violet" />© 2023 Workers
                management. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
