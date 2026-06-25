import DeliveryTable from '@/components/dashboard/librarian/DeliveryTable';
import { getCurrentLibrarianOrderedBook } from '@/lib/api/books';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
// Adjust path if needed

const ManageDeliveries = async () => {
  const userData = await getUserSession();
  const user = userData?.user;

  // Fetching the aggregated data from your Express backend
  const orderedBook = await getCurrentLibrarianOrderedBook(user?.id);
console.log(orderedBook);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-[#0A2540]">Manage Deliveries</h2>
        <p className="text-sm text-slate-500 mt-1">
          Track and update the status of books requested by users.
        </p>
      </div>

      {/* Passing the fetched data to the Client Component */}
      <DeliveryTable orders={orderedBook} />
    </div>
  );
};

export default ManageDeliveries;