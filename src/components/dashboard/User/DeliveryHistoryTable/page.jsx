"use client";

import { Table } from "@heroui/react";
import Image from "next/image";

const DeliveryHistoryTable = ({ orders }) => {
  // স্ট্যাটাস অনুযায়ী কালার বের করার ফাংশন (Pending, Dispatched, Delivered এর জন্য)
  const getStatusColorClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "dispatched":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "pending":
        return "bg-orange-50 text-orange-700 border border-orange-100";
      case "rejected":
      case "cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-slate-200 mt-6">
        <p className="text-slate-500 font-medium">
          You have no delivery history yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mt-6">
      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-slate-100">
        <h2 className="text-[28px] font-bold text-[#0A2540] mb-2 tracking-tight">
          Delivery History
        </h2>
        <p className="text-[14px] text-slate-500 font-medium max-w-3xl">
          Track your book delivery requests, monitor fees, and check current statuses.
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Delivery History" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>BOOK DETAILS</Table.Column>
              <Table.Column>REQUEST DATE</Table.Column>
              <Table.Column>DELIVERY FEE</Table.Column>
              <Table.Column>STATUS</Table.Column>
            </Table.Header>

            <Table.Body>
              {orders.map((order) => {
                // আপনার ডাটা স্ট্রাকচার অনুযায়ী orderStatus
                const status = order?.orderStatus?.toLowerCase();

                return (
                  <Table.Row key={order._id}>
                    {/* BOOK DETAILS */}
                    <Table.Cell>
                      <div className="flex items-center gap-4">
                        <Image
                          width={100}
                          height={100}
                          src={order.bookDetails?.image || "/placeholder-book.png"} // ফলব্যাক ইমেজ
                          alt={order.title || "Book"}
                          className="w-10 h-14 object-cover rounded shadow-sm border border-slate-100"
                        />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">
                            {order.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {order.bookDetails?.author || "Unknown Author"}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* REQUEST DATE */}
                    <Table.Cell>
                      {new Date(order.OrderAt || order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Table.Cell>

                    {/* DELIVERY FEE */}
                    <Table.Cell>
                      <p className="text-sm font-bold text-slate-700">
                        ${order.price}
                      </p>
                    </Table.Cell>

                    {/* STATUS */}
                    <Table.Cell>
                      <span
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide inline-block ${getStatusColorClass(
                          status
                        )}`}
                      >
                        {status || "Unknown"}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default DeliveryHistoryTable;