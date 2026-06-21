"use client";

import React from "react";

const SidebarSkeleton = () => {
  const skeletonNavs = Array.from({ length: 4 });

  return (
    <>
      {/* --- MOBILE TOP BAR NAVIGATION SKELETON --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D3B66] flex items-center justify-between px-4 z-50 border-b border-white/5 animate-pulse">
        <div className="w-[140px] h-[34px] bg-white/10 rounded-lg" />

        <div className="w-10 h-10 bg-white/10 rounded-lg" />
      </div>

      {/* --- CORE SIDEBAR NAVIGATION SKELETON CONTAINER --- */}
      <aside className="fixed top-0 bottom-0 left-0 z-40 w-[260px] bg-[#0A2540] flex flex-col justify-between p-6 pt-20 lg:pt-6 h-screen select-none border-r border-white/5 animate-pulse">
        {/* UPPER PORTION */}
        <div className="space-y-8">
          <div className="w-[160px] h-[40px] bg-white/10 rounded-lg hidden lg:block" />

          <div className="flex items-center gap-4 p-1 w-full">
            <div className="w-12 h-12 bg-white/10 rounded-full shrink-0 border-[3px] border-white/5" />

            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 bg-white/10 rounded w-[85%]" />
              <div className="h-3 bg-white/10 rounded w-[50%]" />
            </div>
          </div>

          <div className="space-y-2">
            {skeletonNavs.map((_, i) => (
              <div
                key={i}
                className="w-full h-11 px-4 rounded-lg bg-white/5 flex items-center gap-3"
              >
                <div className="w-4 h-4 bg-white/10 rounded shrink-0" />

                <div className="h-3 bg-white/10 rounded w-[55%]" />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="w-full h-10 bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* LOWER PORTION: SYSTEM LINKS PLACEHOLDER */}
        <div className="space-y-2 border-t border-white/5 pt-4">
          <div className="w-full h-10 px-4 rounded-lg bg-white/5 flex items-center gap-3">
            <div className="w-4 h-4 bg-white/10 rounded shrink-0" />
            <div className="h-3 bg-white/10 rounded w-[40%]" />
          </div>

          <div className="w-full h-10 px-4 rounded-lg bg-white/5 flex items-center gap-3">
            <div className="w-4 h-4 bg-white/10 rounded shrink-0" />
            <div className="h-3 bg-white/10 rounded w-[35%]" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarSkeleton;
