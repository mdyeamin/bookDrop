// ফাইল পাথ: src/app/unauthorized.js
import React from "react";
import Link from "next/link";
import { FiLock, FiHome } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10 text-center flex flex-col items-center transform transition-all hover:scale-[1.01] duration-300">
        
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FiLock size={32} className="text-red-500" strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-3 tracking-tight">
          Access Denied
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
          You don't have permission to view this page. Please log in with an authorized account to continue reading.
        </p>

        <div className="flex flex-col w-full gap-3">
          <Link href={'/auth/signin'} className="w-full">
            <Button
              size="lg"
              className="w-full bg-[#FA5D39] hover:bg-[#E54823] text-white font-bold h-12 rounded-lg transition-colors shadow-sm"
            >
              Sign In with Authorized Account
            </Button>
          </Link>
          
          <Link href={'/'} className="w-full">
            <Button
              size="lg"
              variant="bordered"
              className="w-full bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0A2540] font-bold h-12 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiHome size={16} />
              Return to Homepage
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}