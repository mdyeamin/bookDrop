import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Blue CTA Card */}
        <div className="relative bg-[#0A2540] rounded-[2.5rem] p-10 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
          
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#103A62] to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#FA5D39]/20 to-transparent rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Text Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Have a collection of books? <br />
                <span className="text-[#FA5D39]">Become a Provider.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-0 leading-relaxed">
                Join our community of librarians. Share your books, manage deliveries seamlessly, and help spread the joy of reading to thousands of users.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link 
                href="/auth/signup?role=librarian" 
                className="bg-[#FA5D39] hover:bg-[#E54823] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_10px_20px_rgb(250,93,57,0.3)] hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Join as Provider
                <FiArrowRight size={20} />
              </Link>
              
              <Link 
                href="/about" 
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;