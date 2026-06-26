import {
  getCurrentLibrarianBook,
  getCurrentLibrarianOrderedBook,
} from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import LibrarianOverview from "./LibrarianOverview";

const DashboardLibrarian = async () => {
  const userData = await getUserSession();
  const user = userData?.user;

  const [books, orderedBook] = await Promise.all([
    getCurrentLibrarianBook(user?.id),
    getCurrentLibrarianOrderedBook(user?.id),
  ]);

  // console.log("Orders:", orderedBook);
  // console.log("Books:", books);

  return (
    <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Librarian Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Here is the overview of your book listings, earnings, and requests.
        </p>
      </div>

      <LibrarianOverview books={books || []} orders={orderedBook || []} />
    </div>
  );
};

export default DashboardLibrarian;
