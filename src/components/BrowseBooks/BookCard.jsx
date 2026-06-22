"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsTruck } from "react-icons/bs";
import { Button } from "@heroui/react";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const BookCard = ({ book }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-[280px] flex items-center justify-center p-6">
        {/* Delivery Fee Badge */}
        <div className="absolute z-10 flex items-center gap-1.5 top-3 right-3 bg-white px-2.5 py-1.5 rounded text-[12px] font-bold shadow-sm text-[#2A4365]">
          <BsTruck size={14} strokeWidth={0.5} />
          <span>
            {book.deliveryFee === "0" || book.deliveryFee === 0
              ? "Free"
              : `$${book.deliveryFee}`}
          </span>
        </div>

        {/* Book Cover Image */}
        <div className="relative w-36 h-52 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-1.5">
          {book.category}
        </p>

        <h3 className="text-[1.25rem] leading-tight font-bold text-[#0A2540] mb-1.5 line-clamp-1">
          {book.title}
        </h3>

        <p className="text-[15px] text-slate-600 mb-6 flex-grow">
          {book.author}
        </p>

        {/* Action Button */}
        <Link href={`/browse-books/${book._id}`}>
          <Button className="w-full bg-[#F4F6F8] hover:bg-[#E2E8F0] text-[#0A2540] font-semibold border border-[#CBD5E1] rounded-lg transition-colors">
            Request Book
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BookCard;
