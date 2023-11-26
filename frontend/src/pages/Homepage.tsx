import Contact from "@/components/Contact";
import FeaturesSection from "@/components/Features";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import { Navbar } from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import { CubeIcon } from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Homepage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 2,
          ease: "easeOut",
        },
      });
    }
  }, [controls, inView]);

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: "100%", // Start from the left side
    },
    visible: {
      opacity: 1,
      y: 0, // Move to the center
    },
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturesSection />
      <Pricing />
      <Contact />
      <Logos />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariants}
      >
        <footer className="  p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-sm flex items-center gap-4">
                <CubeIcon className="h-6 w-6 violet" />© 2023 Workers
                management. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default Homepage;
