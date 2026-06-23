import OrderContainer from "@/components/dashboard/User/OrderContainer";
import { getDeliveryOrder } from "@/lib/api/order";
import { getUserSession } from "@/lib/core/session";
import React, { Suspense } from "react";

const ReadingListPage = async () => {
  const { user } = await getUserSession();

  // Fetch user's orders
  const myOrder = await getDeliveryOrder(user?.id);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header matching the screenshot */}
      <div className="mb-10">
        <h1 className="text-[2rem] font-bold text-[#0A2540] mb-2 tracking-tight">
          My Reading List
        </h1>
        <p className="text-[#475569] text-[15px]">
          Curating your intellectual journey through BookDrop Enterprise
          Logistics.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        }
      >
        <OrderContainer myOrder={myOrder} />
      </Suspense>
    </div>
  );
};

export default ReadingListPage;
