"use client";

import React from "react";
import Image from "next/image";
import { FiBook, FiDollarSign, FiClock, FiTrendingUp } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const LibrarianOverview = ({ orders = [], books = [] }) => {
  // ১. Quick Stats ক্যালকুলেশন
  const totalBooksListed = books.length;

  const activePendingRequests = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "pending"
  ).length;

  const totalEarnings = orders
    .filter((order) => order.orderStatus?.toLowerCase() === "delivered")
    .reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0)
    .toFixed(2);

  // ২. Chart 1: Earnings by Category (Bar Chart)
  const categoryEarnings = {};
  orders.forEach((order) => {
    if (order.orderStatus?.toLowerCase() === "delivered") {
      const category = order.bookDetails?.category || "Unknown";
      categoryEarnings[category] =
        (categoryEarnings[category] || 0) + (parseFloat(order.price) || 0);
    }
  });

  const barChartData = Object.keys(categoryEarnings).map((key) => ({
    name: key,
    earnings: Number(categoryEarnings[key].toFixed(2)),
  }));

  // ৩. Chart 2: Order Status Distribution (Pie Chart)
  const statusCount = {};
  orders.forEach((order) => {
    const status = order.orderStatus || "pending";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const pieChartData = Object.keys(statusCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: statusCount[key],
  }));

  const PIE_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]; // Pending, Dispatched, Delivered, Cancelled

  // ৪. Mini-list: Most Requested Books
  const bookRequests = {};
  orders.forEach((order) => {
    const title = order.bookDetails?.title || order.title;
    if (title) {
      if (!bookRequests[title]) {
        bookRequests[title] = {
          count: 0,
          image: order.bookDetails?.image || "/placeholder-book.png",
          author: order.bookDetails?.author || "Unknown",
        };
      }
      bookRequests[title].count += 1;
    }
  });

  const topRequestedBooks = Object.keys(bookRequests)
    .map((title) => ({
      title,
      ...bookRequests[title],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Top 4 books

  return (
    <div className="space-y-6 w-full">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
            <FiBook />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Books Listed</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalBooksListed}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Earnings</p>
            <h3 className="text-2xl font-bold text-slate-800">${totalEarnings}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
            <FiClock />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Pending Requests</p>
            <h3 className="text-2xl font-bold text-slate-800">{activePendingRequests}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section (Takes 2/3 of the space) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Earnings by Category Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Earnings by Category</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value) => [`$${value}`, "Earnings"]}
                  />
                  <Bar dataKey="earnings" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders Pipeline (Pie Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Orders Pipeline</h3>
            <div className="h-64 w-full flex justify-center items-center">
              {orders.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-slate-400">No orders yet</p>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
              {pieChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                  {entry.name} ({entry.value})
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Most Requested Books (Takes 1/3 of the space) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Most Requested</h3>
            <FiTrendingUp className="text-blue-500" />
          </div>
          
          <div className="flex-grow space-y-5">
            {topRequestedBooks.length > 0 ? (
              topRequestedBooks.map((book, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                    <Image 
                      src={book.image} 
                      alt={book.title} 
                      fill 
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{book.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{book.author}</p>
                  </div>
                  <div className="flex-shrink-0 bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full text-xs">
                    {book.count} {book.count === 1 ? 'Req' : 'Reqs'}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No requested books yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianOverview;