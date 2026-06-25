import { getAllBooks } from "@/lib/api/books";
import React from "react";
import BooksContainer from "../BrowseBooks/BooksContainer";

const FeaturedBooks = async () => {
  const featuredBooks = (await getAllBooks()) || [];
  const books = featuredBooks.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-[#0A2540] mb-4 tracking-tight leading-tight">
            Featured Books
          </h2>
          {/* Orange accent line */}
          <div className="w-16 h-1.5 bg-[#FA5D39] mx-auto rounded-full mb-5"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
            Explore our handpicked collection of top reads. Discover your next
            favorite book today and expand your reading horizons.
          </p>
        </div>

        {/* Books Grid Container */}
        <div className="mx-auto">
          <BooksContainer books={books} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
