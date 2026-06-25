"use client";

import { updateOrderStatusById } from "@/lib/action/books";
import Image from "next/image";
import React, { useState } from "react";

import { FiCheck, FiTruck, FiClock } from "react-icons/fi";

const DeliveryTable = ({ orders }) => {
  
  const [loadingId, setLoadingId] = useState(null);

  

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return (
          <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            <FiCheck size={12} /> Delivered
          </span>
        );
      case "dispatched":
        return (
          <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
            <FiTruck size={12} /> Dispatched
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
            <FiClock size={12} /> Pending
          </span>
        );
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
        No delivery orders found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Client Info</th>
              <th className="px-6 py-4">Book Title</th>
              <th className="px-6 py-4">Order Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map((order) => {
                
                
              const clientName = order.buyerDetails?.name || "Unknown Client";
              const clientImage = order?.buyerDetails?.image;
              const clientEmail = order.userEmail || order.buyerDetails?.email;
              const bookTitle = order.bookDetails?.title || order.title;
              const currentStatus =
                order.orderStatus?.toLowerCase() || "pending";

              const orderDate = new Date(order.OrderAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <tr
                  key={order._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar System */}
                      {clientImage ? (
                        <Image
                          src={clientImage}
                          alt={`${clientName}'s avatar`}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-[#103A62] flex items-center justify-center font-bold text-sm border border-blue-100 shrink-0 shadow-sm">
                          {clientName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="font-bold text-[#0A2540]">{clientName}</p>
                        <p className="text-xs text-slate-500">{clientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{bookTitle}</td>
                  <td className="px-6 py-4 text-slate-500">{orderDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(currentStatus)}</td>

                  {/* Action Button Column */}
                  <td className="px-6 py-4 text-right">
                    {currentStatus === "pending" && (
                      <button
                        onClick={() =>
                          updateOrderStatusById(order?._id, "dispatched")
                        }
                        disabled={loadingId === order._id}
                        className="bg-[#0A2540] hover:bg-[#103A62] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 ml-auto"
                      >
                        {loadingId === order._id ? "Updating..." : "Dispatch"}
                      </button>
                    )}

                    {currentStatus === "dispatched" && (
                      <button
                        onClick={() =>
                          updateOrderStatusById(order._id, "delivered")
                        }
                        disabled={loadingId === order._id}
                        className="bg-[#FA5D39] hover:bg-[#E54823] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 ml-auto"
                      >
                        {loadingId === order._id ? "Updating..." : "Deliver"}
                      </button>
                    )}

                    {currentStatus === "delivered" && (
                      <span className="text-xs font-bold text-slate-400">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryTable;
