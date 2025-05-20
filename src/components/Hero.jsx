import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { assets } from "../assets/assets.js";

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [inView, controls]);


{/* Heading */}
return (
  <>

  <img className='w-full h-45' src={assets.bg_img}></img>
  <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="flex flex-col items-center text-center px-4">
        <div>
          <img className="w-60 h-60" src={assets.header_img} alt="Robot" />
        </div>
    <h1
      className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
    >
      Create, collaborate,<br />
      Write smarter, and Build faster.
    </h1>

    {/* Subtext */}
    <p className="mt-4 text-gray-500 text-lg max-w-xl">
    From dev blogs to API docs and product guides — everything, in one intelligent workspace.
    Powered by AI. Controlled by you.
    </p>

    {/* Buttons */}
    <div className="mt-8 flex gap-4 flex-wrap justify-center">
      <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-xl ">
        Sign up for free
      </button>
      <button className="border px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition">
        💬 Talk to founders
      </button>
    </div>

    {/* Footer Note */}
    <p className="mt-4 text-lg text-gray-400">No setup. No stress. Just say it — and Jarvis builds it.</p>
  </motion.div>
  </>
);
}
export default Hero;
