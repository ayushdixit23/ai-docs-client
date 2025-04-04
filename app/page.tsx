
"use client"
import GlowingButton from "@/components/GlowingButton";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { motion } from "motion/react"
import BlurFade from "@/components/Blurfade";
import { NeonGradientCard } from "@/components/NeonGradientCard";
import Image from "next/image";

const HowItWorksPage: React.FC = () => {
 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-white mb-12"
        >
          How It Works
        </motion.h1>


      </motion.div>
    </div>
  );
};



const page = () => {
  return (
    <div className="bg-custom-gradient">
      <div className="w-full select-none relative">
        <div className="mx-auto max-w-[1280px] text-white">
          <header className="flex justify-between pt-3 sm:pt-6 px-3 sm:px-0 items-center w-full ">
            <h1 className="sm:text-2xl text-xl font-semibold">DocSimplify</h1>
            <GlowingButton />
          </header>
          <main className="flex h-[30rem] sm:h-[40rem] flex-col justify-center items-center">
            <div className="flex flex-col gap-4 text-center sm:max-w-[740px]">
              <div className="flex justify-center items-center">

                <button className=" no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-0.5 px-4 ring-1 ring-white/10 ">
                    <span>✨ DocSimplify</span>
                    <svg
                      fill="none"
                      height="16"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.75 8.75L14.25 12L10.75 15.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
              </div>

              {/* <motion.h1
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1}}
              transition={{
                ease: "easeInOut",
                duration: .5
              }} 
                 className="leading-snug text-white/70 sm:text-4xl text-3xl md:text-7xl font-bold">
               */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4
                }}
                className="leading-snug text-white/70 sm:text-4xl text-3xl md:text-7xl font-bold"
                style={{
                  transformOrigin: "center",
                  transform: "perspective(1000px)"
                }}
              >
                Simplify Your Docs Easily with AI
              </motion.h1>
              {/* <p className="text-[#a1a1aa] sm:leading-8 sm:text-lg text-sm md:text-xl font-semibold">
              Designed to simplify technical docs (like React, Nextjs and more) using AI, making them easier to understand with simple words, clear examples, and better explanations.
            </p> */}

              <motion.p
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
                className="text-[#a1a1aa] sm:leading-8 sm:text-lg text-sm md:text-xl font-semibold"
                style={{
                  transformOrigin: "center",
                  transform: "perspective(1000px)"
                }}
              >
                Designed to simplify technical docs (like React, Next.js, and more) using AI, making them easier to understand with simple words, clear examples, and better explanations.
              </motion.p>


              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: .7
                }}

                className="flex justify-center mt-7 items-center">
                <GlowingButton text={<>
                  <div>Try It Now</div>
                  <ArrowUpRight size={22} />
                </>} />
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      <div className="px-4 pb-14 mt-6">
        <BlurFade delay={0.25 * 5}>
          <NeonGradientCard
            className="max-w-[1280px] mx-auto"
            borderSize={1}
            // neonColors={{
            //   firstColor: "yellow , orange",
            //   secondColor: "blue, green",
            // }}
       
            neonColors={{
              firstColor: "#FF4500", // Deep Neon Orange
              secondColor: "#1E90FF", // Vivid Neon Blue
            }}
          >
            <Image
              src={"/code.jpeg"}
              alt="Image"
              width={1920}
              height={1080}
            ></Image>
          </NeonGradientCard>
        </BlurFade>
      </div>

      <HowItWorksPage/>
    </div>
  );
};

export default page;
