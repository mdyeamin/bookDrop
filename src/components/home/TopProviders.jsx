import { getUsers } from "@/lib/api/users";
import Image from "next/image";
import React from "react";
import { FiStar, FiTruck } from "react-icons/fi";

const TopProviders = async () => {
  // API থেকে ইউজার ডেটা নিয়ে আসা
  const users = await getUsers();
  
  // শুধুমাত্র librarian রোলের ইউজারদের ফিল্টার করা
  const librarians = users?.filter((user) => user?.role === "librarian") || [];
  
  // ৪ থেকে ৭ নম্বর ইনডেক্সের ৩ জন লিব্রারিয়ানকে নেওয়া হচ্ছে
  const threeLibrarians = librarians.slice(4, 7);

  // যদি ৩ জন লিব্রারিয়ান না পাওয়া যায়
  if (!threeLibrarians || threeLibrarians.length === 0) {
    return null;
  }

  // স্ট্যাটিক ডেলিভারি এবং রেটিং কাউন্ট
  const staticStats = [
    { deliveries: 142, rating: "4.9" },
    { deliveries: 128, rating: "4.8" },
    { deliveries: 115, rating: "4.9" },
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Blur Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FA5D39]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-24 w-96 h-96 bg-[#0A2540]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-[#FA5D39] font-extrabold tracking-widest uppercase text-[11px] mb-3 block">
            Excellence in Service
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-6 tracking-tight">
            Top Providers of the Month
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Recognizing our most dedicated librarians who go above and beyond to ensure timely and safe book deliveries.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 px-4 sm:px-0">
          {threeLibrarians.map((provider, index) => {
            const fallbackInitial = provider?.name?.charAt(0).toUpperCase() || "L";
            const stats = staticStats[index];

            return (
              <div
                key={provider._id || index}
                className="group relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(10,37,64,0.12)] transition-all duration-500 border border-slate-100 overflow-hidden hover:-translate-y-2 mt-8 md:mt-0"
              >
                {/* Top Gradient Cover Photo */}
                <div className="h-28 bg-gradient-to-br from-[#0A2540] to-[#18487A] relative">
                  {/* Subtle pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
                  ></div>
                </div>

                {/* Overlapping Avatar */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-blue-50 flex items-center justify-center relative z-10">
                      {provider?.image ? (
                        <Image
                          src={provider.image}
                          alt={provider?.name || "Provider"}
                          width={112}
                          height={112}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-[#103A62] text-4xl font-black">
                          {fallbackInitial}
                        </span>
                      )}
                    </div>
                    {/* Rank Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-[#FA5D39] text-white w-9 h-9 flex items-center justify-center rounded-full border-[3px] border-white shadow-md z-20">
                      <span className="text-[13px] font-black">#{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-20 pb-8 px-8 text-center">
                  <h3 className="text-2xl font-extrabold text-[#0A2540] mb-1 group-hover:text-[#FA5D39] transition-colors">
                    {provider?.name || "Unknown Provider"}
                  </h3>
                  <p className="text-sm text-slate-500 font-semibold tracking-wide mb-8">
                    Certified Librarian
                  </p>

                  {/* Divider & Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                        <FiTruck size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Deliveries</span>
                      </div>
                      <p className="text-2xl font-black text-[#0A2540]">{stats.deliveries}</p>
                    </div>
                    
                    <div className="flex flex-col items-center border-l border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                        <FiStar size={14} className="text-[#D97706]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Rating</span>
                      </div>
                      <p className="text-2xl font-black text-[#0A2540]">{stats.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopProviders;