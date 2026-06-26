import BookPagination from "@/components/BrowseBooks/BookPagination";
import BooksContainer from "@/components/BrowseBooks/BooksContainer";
import FilterBooks from "@/components/BrowseBooks/FilterBooks";

import BookCardSkeleton from "@/components/Loading/BookCardSkeleton";
import { getAllBooks } from "@/lib/api/books";
import React, { Suspense } from "react";

const BrowseBooks = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  
  
  const { books = [], totalPages = 1 } = await getAllBooks(resolvedParams);

  return (
    <div>
      <FilterBooks />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
            </div>
          </div>
        }
      >
        <BooksContainer books={books} />
      </Suspense>

    
      <BookPagination totalPages={totalPages} />
    </div>
  );
};

export default BrowseBooks;