"use client";
import React, { useEffect, useRef } from "react";
import BlurFade from "./Blurfade";
import { NeonGradientCard } from "./NeonGradientCard";

const PreviewBlock = () => {
  const vidRef = useRef(null);

  useEffect(() => {
    if (!vidRef.current) return;
    // @ts-ignore
    vidRef.current?.play();
  }, []);
  return (
    <div className="px-4 pb-14 mt-6">
      <BlurFade delay={0.25 * 5}>
        <NeonGradientCard
          className="max-w-[1280px] mx-auto"
          borderSize={1}
          neonColors={{
            firstColor: "#FF4500",
            secondColor: "#1E90FF",
          }}
        >
          <video
            ref={vidRef}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
            src="https://d317fpcin2orjd.cloudfront.net/chatsMedias/output.mp4"
          />
        </NeonGradientCard>
      </BlurFade>
    </div>
  );
};

export default PreviewBlock;
