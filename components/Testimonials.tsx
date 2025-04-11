
"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from 'motion/react';
import Image from "next/image";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="sm:text-4xl text-3xl md:text-5xl font-extrabold py-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  mb-4">
          What Developers Are Saying
        </h2>
        <p className="text-white text-sm sm:text-base">
          Discover how engineers, teams, and tech leads are transforming their workflow with our AI-powered documentation simplifier.
        </p>
      </motion.div>

      <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>

  );
}

const testimonials = [
  {
    quote:
      "This tool helped me finally understand complex React concepts. It's like having a senior developer explain things in plain English — with working code snippets included.",
    name: "Alex Chen",
    title: "Frontend Developer at TechStack Inc.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "I use this for onboarding new devs on my team. Instead of throwing docs at them, I give them simplified explanations powered by your AI. Huge time-saver.",
    name: "Sarah Johnson",
    title: "Engineering Manager at DevFlow",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "We integrated it into our internal tools. The ability to convert dense API documentation into digestible summaries is a game-changer for productivity.",
    name: "Miguel Santana",
    title: "CTO at CodeNova",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    quote:
      "As a junior developer, this AI tool is like my cheat code. I actually understand what’s happening in the docs now — and I feel more confident shipping code.",
    name: "Priya Patel",
    title: "React Developer at Interfaced",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "I requested simplification for a library we use, and within a week it was supported. Super responsive team and a really smart product.",
    name: "Liam Nguyen",
    title: "Full Stack Developer at Launchify",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];



export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image:string
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl text-white/80 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border-[#fff]/20 border border-b-0  px-8 py-6 md:w-[450px]"
            key={idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-sm leading-[1.6] font-normal  ">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 gap-2 flex flex-row items-center">
                <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="w-full h-full"/>
                </div>
                <span className="flex flex-col">
                  <span className="font-semibold text-white leading-[1.6]">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};


