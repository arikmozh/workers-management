const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Stats() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
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
      x: "-100%", // Start from the left side
    },
    visible: {
      opacity: 1,
      x: 0, // Move to the center
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
    >
      <div className=" py-24 sm:py-32" id="Stats">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4 "
              >
                <dt className="text-base leading-7 ">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl text-violet-600">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.div>
  );
}
