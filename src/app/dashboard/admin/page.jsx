import { getAllBooksByAdmin, getUsers } from "@/lib/api/users";
import React from "react";
import AdminOverview from "./users/AdminOverview";
import { getOrderedBookForAdmin } from "@/lib/api/books";

const DashboardAdmin = async () => {
  const users = await getUsers();
  const manageBooks = await getAllBooksByAdmin();
  const orderedBook = await getOrderedBookForAdmin();

  // console.log(orderedBook);

  return (
    <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          System overview, user statistics, and book inventory.
        </p>
      </div>

      <AdminOverview
        users={users || []}
        books={manageBooks || []}
        orders={orderedBook || []}
      />
    </div>
  );
};

export default DashboardAdmin;
