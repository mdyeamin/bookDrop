"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const OrderContainer = ({ myOrder }) => {
  // console.log(myOrder);
  const deliveredBook = myOrder?.filter(
    (book) => book.orderStatus === "delivered",
  ) || [];
  console.log(deliveredBook);

  if (deliveredBook.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">
          Your reading list is currently empty.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "delivered":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {deliveredBook.map((order) => {
        const currentStatus = order.orderStatus || order.status || "Pending";

        return (
          <Link
            href={`/browse-books/${order.bookDetails?._id}`}
            key={order._id || order.id}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[1.25rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-[240px] w-full bg-slate-100">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-extrabold text-[#0A2540] uppercase tracking-wider shadow-sm">
                  {order.bookDetails?.category || order.category || "CATEGORY"}
                </div>

                <Image
                  src={order.bookDetails?.image}
                  alt={order.title || "Book Cover"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#0A2540] leading-tight mb-1 truncate">
                  {order.title || "Unknown Title"}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">
                  {order.bookDetails?.author || "Unknown Author"}
                </p>

                {/* ✅ Order Status & Delete Icon Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    {/* Status Badge (Small format) */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border ${getStatusBadge(
                        currentStatus,
                      )}`}
                    >
                      {currentStatus}
                    </span>

                    {/* Delete Icon Button */}
                    {/* <button
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        

                        console.log("Delete clicked for:", order._id);
                      }}
                      className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-md transition-colors"
                      aria-label="Delete order"
                    >
                      <FiTrash2 size={16} />
                    </button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default OrderContainer;
