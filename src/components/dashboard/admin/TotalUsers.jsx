import React from "react";

const TotalUsers = ({users}) => {
  
  

  return (
    <div className="w-full bg-[#F8FAFC] p-6">
      {/* ৩ কলামের রেসপনসিভ গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ১. TOTAL USERS CARD */}
        <div className="bg-[#FDFDFE] rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-6 flex flex-col justify-between min-h-[140px] select-none">
          <span className="text-[11px] font-black text-slate-500 tracking-widest uppercase">
            Total Users
          </span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-[38px] font-black text-[#0A2540] tracking-tight leading-none">
              {users.length}
            </span>
            <span className="text-[11px] font-black text-[#F46036] tracking-wide bg-[#F46036]/5 px-2 py-0.5 rounded-md">
              +12%
            </span>
          </div>
        </div>

        {/* ২. ACTIVE SESSIONS CARD */}
        <div className="bg-[#FDFDFE] rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-6 flex flex-col justify-between min-h-[140px] select-none">
          <span className="text-[11px] font-black text-slate-500 tracking-widest uppercase">
            Active Sessions
          </span>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-[38px] font-black text-[#0A2540] tracking-tight leading-none">
              342
            </span>
            <span className="text-[11px] font-bold text-slate-500 tracking-normal">
              Live Now
            </span>
          </div>
        </div>

        {/* ৩. STORAGE USED CARD (উইথ সলিড প্রোগ্রেস বার) */}
        <div className="bg-[#FDFDFE] rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-6 flex flex-col justify-between min-h-[140px] select-none">
          <span className="text-[11px] font-black text-slate-500 tracking-widest uppercase">
            Storage Used
          </span>
          <div className="flex items-center justify-between gap-4 mt-4 w-full">
            <span className="text-[38px] font-black text-[#0A2540] tracking-tight leading-none shrink-0">
              84%
            </span>
            {/* স্ক্রিনশটের হুবহু ডার্ক ব্লু প্রোগ্রেস বার */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden max-w-[180px]">
              <div 
                className="bg-[#0A2540] h-full rounded-full transition-all duration-500"
                style={{ width: "84%" }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TotalUsers;