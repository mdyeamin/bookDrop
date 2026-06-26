import { getDeliveryOrder } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import UserOverview from './UserOverview';


const DashboardUser = async () => {
    const { user } = await getUserSession();
      
    // Fetch user's orders
    const myOrder = await getDeliveryOrder(user?.id);

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>
                <p className="text-slate-500 mt-1">
                    Welcome back! Here's what's happening with your books.
                </p>
            </div>
            
            {/* ক্লায়েন্ট কম্পোনেন্টে ডাটা পাস করা হচ্ছে */}
            <UserOverview orders={myOrder} />
        </div>
    );
};

export default DashboardUser;