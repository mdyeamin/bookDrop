import React from "react";
import { FiSearch, FiTruck, FiBookOpen, FiMousePointer } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Books",
      description: "Browse through thousands of books across multiple categories.",
      icon: <FiSearch size={28} />,
    },
    {
      id: 2,
      title: "Request Delivery",
      description: "Select your desired book and place a quick delivery request.",
      icon: <FiMousePointer size={28} />,
    },
    {
      id: 3,
      title: "Fast Dispatch",
      description: "Our providers quickly process and dispatch your order.",
      icon: <FiTruck size={28} />,
    },
    {
      id: 4,
      title: "Enjoy Reading",
      description: "Receive your book at your doorstep and start reading.",
      icon: <FiBookOpen size={28} />,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[#FA5D39] font-extrabold tracking-widest uppercase text-[11px] mb-3 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 tracking-tight">
            How BookDrop Works
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Get your favorite books delivered to your doorstep in just four simple steps. It's fast, secure, and hassle-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          
          {/* Connecting Line for Large Screens */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-200 border-t-2 border-dashed border-slate-300 z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#0A2540] border-[6px] border-[#F8FAFC] shadow-[0_10px_30px_rgb(10,37,64,0.08)] mb-6 group hover:-translate-y-2 hover:bg-[#FA5D39] hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              
              {/* Step Number */}
              <div className="bg-[#0A2540] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold absolute top-0 right-1/2 translate-x-12 border-4 border-[#F8FAFC]">
                {step.id}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;