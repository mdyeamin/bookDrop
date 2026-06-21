"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSlider.css"; 

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop",
    title: "Your Local Library, Delivered",
    subtitle: "Welcome to BookDrop. Experience the joy of reading without leaving your home. We bring the best local collections straight to your doorstep.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop",
    title: "Discover Diverse Collections",
    subtitle: "From gripping sci-fi adventures to deep academic research, find exactly what you need from the BookDrop network of providers.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop",
    title: "Seamless Doorstep Delivery",
    subtitle: "Request your favorite books, track your delivery securely, and enjoy a hassle-free borrowing experience.",
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    /* Dynamic height calculation ensuring it never gets too small or excessively large on ultrawide screens */
    <section className="relative w-full h-[65vh] min-h-[500px] max-h-[850px] bg-[#0A2540] group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            
            {/* Image Layer with Next.js Image for production optimization */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ease-linear ${
                activeIndex === index ? "scale-110" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0} // Optimizes LCP by preloading the first slide
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            
            {/* Dark Overlays for maximum text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/70 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Container - Professionally aligned for large devices */}
            <div className="relative z-10 w-full h-full container mx-auto max-w-7xl 2xl:max-w-[1400px] px-6 md:px-12 flex flex-col justify-center items-start">
              <div className="max-w-2xl 2xl:max-w-3xl">
                {activeIndex === index && (
                  <>
                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                      className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                      className="text-base md:text-lg lg:text-xl text-slate-200 mb-10 font-medium leading-relaxed max-w-xl 2xl:max-w-2xl"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                    >
                      <Button
                        as={Link}
                        href="/browse"
                        size="lg"
                        className="bg-[#F46036] hover:bg-[#D34A26] text-white font-bold px-8 h-14 text-base rounded-xl shadow-[0_8px_20px_rgba(244,96,54,0.3)] transition-all flex items-center gap-2 group"
                      >
                        Browse Books
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Hidden on mobile, visible on hover for desktop */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-4 md:left-8 2xl:left-12 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F46036] text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 invisible group-hover:visible">
        <FiChevronLeft size={24} />
      </div>
      
      <div className="swiper-button-next-custom absolute top-1/2 right-4 md:right-8 2xl:right-12 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#F46036] text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer opacity-0 group-hover:opacity-100 invisible group-hover:visible">
        <FiChevronRight size={24} />
      </div>
    </section>
  );
};

export default HeroSlider;