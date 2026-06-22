import BooksContainer from "@/components/BrowseBooks/BooksContainer";
import FilterBooks from "@/components/BrowseBooks/FilterBooks";
import BookCardSkeleton from "@/components/Loading/BookCardSkeleton";
import { getAllBooks } from "@/lib/api/books";
import React, { Suspense } from "react";

const BrowseBooks = async () => {
  const books = await getAllBooks();

  return (
    <div>
      <FilterBooks />
      <Suspense fallback={<BookCardSkeleton/>}>
        <BooksContainer books={books} />
      </Suspense>
    </div>
  );
};

export default BrowseBooks;
