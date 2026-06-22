"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiAlertTriangle, FiRefreshCcw, FiArrowLeft } from "react-icons/fi";

export default function Error({ error, unstable_retry }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-transparent">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
        
        {/* Error Icon Container */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
          <FiAlertTriangle className="text-red-500 size-8" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-[#0A2540] mb-3 tracking-tight">
          Something went wrong!
        </h2>
        
        {/* Error Description */}
        <div className="text-slate-500 text-[15px] mb-8 w-full">
          <p className="mb-3">
            We encountered an unexpected error while trying to load this page.
          </p>
          
          {/* Show actual error message in development/debugging (Optional) */}
          {error?.message && (
            <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 text-xs font-mono text-red-600/80 text-left overflow-hidden text-ellipsis line-clamp-3">
              {error.message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* Back Button */}
          <Button
            onClick={() => router.back()}
            variant="bordered"
            className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-6 h-12 rounded-lg flex items-center gap-2.5 transition-all w-full sm:w-auto shadow-sm"
          >
            <FiArrowLeft size={16} />
            Go Back
          </Button>

          {/* Retry Button */}
          <Button
            onClick={() => unstable_retry()}
            className="bg-[#0A2540] hover:bg-[#153e66] text-white font-semibold px-6 h-12 rounded-lg flex items-center gap-2.5 transition-all w-full sm:w-auto shadow-sm"
          >
            <FiRefreshCcw size={16} />
            Try Again
          </Button>
        </div>

      </div>
    </div>
  );
}