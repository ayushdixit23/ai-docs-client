
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
          <div className="flex flex-col gap-4 text-center sm:max-w-[750px]">
            <div className="flex justify-center items-center">
              <div className="p-1.5 cursor-pointer flex justify-center items-center gap-2 px-5 bg-[##18181b] text-sm border-[#fff]/10 rounded-full border">
                <span><BsStars className="text-yellow-500" /></span>
                <span > DocSimplify</span>
                <MoveRight size={15} />
              </div>
            </div>


            <h1 className="leading-snug text-white/70 sm:text-4xl text-3xl md:text-7xl font-bold">
              Unleash the power of intuitive finance
            </h1>
            <p className="text-[#a1a1aa] sm:leading-snug sm:text-lg text-sm md:text-xl font-semibold">
              Say goodbye to the outdated financial tools. Every small business owner, regardless of the background, can now manage their business like a pro. Simple. Intuitive. And never boring.
            </p>
            <div className="flex justify-center mt-7 items-center">
              <GlowingButton text={<>
                
                <div>Try It Now</div>
                <ArrowUpRight size={22}/>
                </>} />
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
