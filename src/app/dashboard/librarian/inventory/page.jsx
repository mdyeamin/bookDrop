import BooksTable from "@/components/dashboard/admin/inventory/BooksTable";
import { getCurrentLibrarianBook } from "@/lib/api/books";
import { getUserSession } from "@/lib/core/session";

import React from "react";

const inventoryPage = async () => {
  const user = await getUserSession();

  const userId = user?.user?.id;

  const books = await getCurrentLibrarianBook(userId);

  return (
    <div>
      inventory {books.length}
      <BooksTable books={books} />
    </div>
  );
};

export default inventoryPage;
