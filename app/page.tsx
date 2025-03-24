
import GlowingButton from "@/components/GlowingButton";
import { ArrowUpRight, MoveRight } from "lucide-react";
import React from "react";
import { BsStars } from "react-icons/bs";

const page = () => {
  return (
    <div className="w-full select-none bg-custom-gradient relative">

      <div className="mx-auto max-w-[1280px] text-white  h-screen">
        <header className="flex justify-between pt-3 sm:pt-6 px-3 sm:px-0 items-center w-full ">
          <h1 className="sm:text-2xl text-xl font-semibold">DocSimplify</h1>
          <GlowingButton />
        </header>
        <main className="h-[40rem] flex justify-center items-center">
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

            <h1 className="leading-snug text-white/70 sm:text-4xl text-3xl md:text-7xl font-bold">
              Simplify Your Docs Easily with AI
            </h1>
            <p className="text-[#a1a1aa] sm:leading-8 sm:text-lg text-sm md:text-xl font-semibold">
              Designed to simplify technical docs (like React, Nextjs and more) using AI, making them easier to understand with simple words, clear examples, and better explanations.
            </p>
            <div className="flex justify-center mt-7 items-center">
              <GlowingButton text={<>

                <div>Try It Now</div>
                <ArrowUpRight size={22} />
              </>} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
