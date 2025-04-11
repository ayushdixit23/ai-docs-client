import React from 'react'
import BlurFade from './Blurfade'
import { NeonGradientCard } from './NeonGradientCard'
import Image from 'next/image'

const PreviewBlock = () => {
    return (
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
    )
}

export default PreviewBlock