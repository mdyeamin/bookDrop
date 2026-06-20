"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";

const notFound = () => {
  return (
    <main className="min-h-screen w-full bg-[#EAECEF] bg-[radial-gradient(#cdd2d9_1px,transparent_1px)] [background-size:20px_24px] flex items-center justify-center p-4 sm:p-6 select-text relative overflow-hidden">
      
      {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#0D3B66]/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[550px] text-center space-y-6 sm:space-y-8">
        
        {/* ৪MD অ্যানিমেশন সেকশন */}
        <div className="relative select-none flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[100px] sm:text-[150px] font-black tracking-tighter text-[#0D3B66] leading-none drop-shadow-sm"
          >
            404
          </motion.h1>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bg-[#F46036] text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md top-[65%] rotate-[-6deg]"
          >
            Page Not Found
          </motion.div>
        </div>

        {/* টেক্সট মেসেজিং কার্ড */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(13,59,102,0.06)] p-6 sm:p-8 space-y-3"
        >
          <h2 className="text-xl sm:text-2xl font-black text-[#0D3B66] tracking-tight">
            Looks like you're lost!
          </h2>
          <p className="text-[13px] sm:text-[14px] font-semibold text-slate-400 max-w-sm mx-auto leading-relaxed">
            The data or page you are looking for doesn't exist, or has been relocated within our logistics network.
          </p>
        </motion.div>

        {/* অ্যাকশন বাটন সেকশন */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto"
        >
          {/* ব্যাক বাটন */}
          <Button
            onClick={() => window.history.back()}
            variant="bordered"
            className="w-full sm:w-auto h-11 px-6 border-gray-200 text-slate-700 hover:bg-white font-bold text-[13px] rounded-xl transition-all flex items-center justify-center gap-2 bg-transparent uppercase tracking-wider"
          >
            <FiArrowLeft size={15} strokeWidth={2.5} />
            <span>Go Back</span>
          </Button>

          {/* হোম বাটন */}
          <Link
          
            href="/"
            className="w-full sm:w-auto h-11 px-8 bg-[#F46036] hover:bg-[#D34A26] text-white font-black text-[13px] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <FiHome size={15} strokeWidth={2.5} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

      </div>
    </main>
  );
};

export default notFound;