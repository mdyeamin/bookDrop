"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const BooksContainer = ({ books }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {books.map((book) => (
                    <BookCard key={book._id} book={book}/>
                ))}
            </motion.div>
        </div>
    );
};

export default BooksContainer;