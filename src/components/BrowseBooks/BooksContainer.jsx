"use client";

import React from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import { FiBook } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BooksContainer = ({ books }) => {
  const approvedBooks = books.filter((book) => book.status === "approved");

  if (approvedBooks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center"
      >
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <FiBook size={40} className="text-slate-400" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-3">
          No Books Available
        </h2>

        <p className="text-slate-500 text-[15px] max-w-md leading-relaxed">
          There are currently no approved books to display. Please check back
          later as our library is always growing.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {approvedBooks.map((book) => (
          
          <BookCard key={book._id} book={book} />
        ))}
      </motion.div>
    </div>
  );
};

export default BooksContainer;
