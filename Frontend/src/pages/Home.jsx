import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-4xl md:text-7xl font-bold dark:text-white text-center">
          Manage Your Task.
        </div>
        <div className="font-extralight text-sm md:text-sm dark:text-neutral-200 py-4 w-[80%]">
          Simple, flexible, and powerful. All it takes are boards, lists, and
          cards to get a clear view of who’s doing what and what needs to get
          done.
        </div>
        <div className="flex gap-10 text-sm">
        <Link to="/signup" className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-5 py-1 hover:bg-slate-200">
          Get Started Now
        </Link>
        <Link to="https://github.com/rajan153/Voosh-Assignment" target="_blank" className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-5 py-1 hover:bg-slate-200">
          Github
        </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default Home;
