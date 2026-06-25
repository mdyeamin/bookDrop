import DeliveryHistoryTable from '@/components/dashboard/User/DeliveryHistoryTable/page';
import { getDeliveryOrder } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const DeliveryHistory = async () => {
  const { user } = await getUserSession();
  
  // Fetch user's orders
  const myOrder = await getDeliveryOrder(user?.id);
  console.log(myOrder);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      
      <DeliveryHistoryTable orders={myOrder} />
    </div>
  );
};

export default DeliveryHistory;