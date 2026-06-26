"use client";

import React from "react";
import { FiBookOpen, FiTruck, FiDollarSign } from "react-icons/fi";
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

const UserOverview = ({ orders = [] }) => {
  // ১. Quick Stats ক্যালকুলেশন
  const totalBooksRead = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  const pendingDeliveries = orders.filter(
    (order) => order.orderStatus !== "delivered"
  ).length;

  const totalSpentOnFees = orders.reduce((sum, order) => {
    // string "7.99" কে float এ কনভার্ট করা হচ্ছে
    const fee = parseFloat(order.bookDetails?.deliveryFee) || 0;
    return sum + fee;
  }, 0).toFixed(2);

  // ২. Bar Chart ডাটা (বইয়ের ক্যাটাগরি অনুযায়ী)
  const categoryCount = {};
  orders.forEach((order) => {
    const category = order.bookDetails?.category || "Unknown";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    count: categoryCount[key],
  }));

  // ৩. Pie Chart ডাটা (অর্ডার স্ট্যাটাস অনুযায়ী)
  const statusCount = {};
  orders.forEach((order) => {
    const status = order.orderStatus || "pending";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize (e.g., delivered -> Delivered)
    value: statusCount[key],
  }));

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <div className="space-y-6 w-full">
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Books Read */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl">
            <FiBookOpen />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Books Read</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalBooksRead}</h3>
          </div>
        </div>

        {/* Card 2: Pending Deliveries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
            <FiTruck />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Deliveries</p>
            <h3 className="text-2xl font-bold text-slate-800">{pendingDeliveries}</h3>
          </div>
        </div>

        {/* Card 3: Total Spent */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Spent on Fees</p>
            <h3 className="text-2xl font-bold text-slate-800">${totalSpentOnFees}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Books by Category */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Books by Category</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Order Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Order Status Breakdown</h3>
          <div className="h-72 w-full flex justify-center items-center">
            {orders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400">No data available</p>
            )}
          </div>
          {/* Custom Legend */}
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserOverview;