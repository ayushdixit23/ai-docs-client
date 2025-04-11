import React from "react";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import PreviewBlock from "@/components/PreviewBlock";
import Footer from "@/components/Footer";


const page = () => {
  return (
    <div className="bg-custom-gradient">
      <HeroSection />
      <PreviewBlock />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Footer/>
    </div>
  );
};

export default page;
