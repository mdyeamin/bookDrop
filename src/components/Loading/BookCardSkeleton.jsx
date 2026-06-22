import React from "react";

const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      
      {/* Image Section Skeleton */}
      <div className="relative h-[280px] bg-slate-100 flex items-center justify-center p-6">
        
        {/* Delivery Fee Badge Skeleton */}
        <div className="absolute top-3 right-3 bg-slate-200 w-14 h-7 rounded"></div>

        {/* Book Cover Image Skeleton */}
        <div className="w-36 h-52 bg-slate-200 rounded-sm shadow-sm"></div>
      </div>

      {/* Content Section Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Category Skeleton */}
        <div className="h-3 bg-slate-200 rounded w-16 mb-2.5"></div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2.5"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-2.5"></div>
        
        {/* Author Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-6 flex-grow"></div>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-slate-200 rounded-lg"></div>
        
      </div>
    </div>
  );
};

export default BookCardSkeleton;