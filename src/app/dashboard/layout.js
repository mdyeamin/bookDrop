import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC]">
     
      <DashboardSidebar />
      
     
      <div className="pt-16 lg:pt-0 lg:pl-[260px] min-h-screen w-full transition-all duration-300">
        <main className="p-4 sm:p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;