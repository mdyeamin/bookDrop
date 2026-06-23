"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle, FiBook } from "react-icons/fi";
import Link from "next/link";

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
  console.log(myOrder);

  if (!myOrder || myOrder.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">
          Your reading list is currently empty.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {myOrder.map((order) => {
        console.log(order);
        
        const progress = order.progress || 85;
        const status = order.status || "in_progress";

        return (
          <Link href={`/browse-books/${order.bookDetails._id}`} key={order._id || order.id}>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[1.25rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-[240px] w-full bg-slate-100">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-extrabold text-[#0A2540] uppercase tracking-wider shadow-sm">
                  {order.category || "CATEGORY"}
                </div>

                <Image
                  src={order.bookDetails.image}
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
                  {order.bookDetails.author || "Unknown Author"}
                </p>

                {/* Status Footer */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                      {status === "completed" && (
                        <FiCheckCircle className="text-emerald-500" size={14} />
                      )}
                      {status === "in_progress" && (
                        <FiClock className="text-slate-500" size={14} />
                      )}
                      {status === "queue" && (
                        <FiBook className="text-slate-500" size={14} />
                      )}

                      <span>
                        {status === "completed"
                          ? "Read Jun 2024"
                          : status === "queue"
                            ? "Not Started"
                            : `${progress}% Read`}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest ${
                        status === "completed"
                          ? "text-emerald-600"
                          : status === "in_progress"
                            ? "text-[#B44C27]"
                            : "text-slate-400"
                      }`}
                    >
                      {status === "in_progress" ? "In Progress" : status}
                    </span>
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
