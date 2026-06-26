"use client";

import React from "react";
import { FiUsers, FiBook, FiTruck, FiDollarSign } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminOverview = ({ users = [], books = [], orders = [] }) => {
  const totalUsers = users.length;
  const totalBooks = books.length;

  const totalDeliveries = orders.filter(
    (order) => order.orderStatus === "delivered",
  ).length;

  const totalRevenue = orders
    .reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0)
    .toFixed(2);

  // ২. Pie Chart ডাটা: Books by Category
  const categoryCount = {};
  books.forEach((book) => {
    const category = book.category || "Uncategorized";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  // ৩. Bar Chart data: Users by Role
  const roleCount = {};
  users.forEach((user) => {
    const role = user.role || "user";
    roleCount[role] = (roleCount[role] || 0) + 1;
  });

  const roleData = Object.keys(roleCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    count: roleCount[key],
  }));

  const PIE_COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div className="space-y-6 w-full mt-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl shrink-0">
            <FiUsers />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalUsers}</h3>
          </div>
        </div>

        {/* Total Books */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl shrink-0">
            <FiBook />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Books</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalBooks}</h3>
          </div>
        </div>

        {/* Total Deliveries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl shrink-0">
            <FiTruck />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Deliveries
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {totalDeliveries}
            </h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shrink-0">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800">
              ${totalRevenue}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Books by Category */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Books by Category
          </h3>

          <div className="w-full min-h-[380px] flex justify-center items-center">
            {books.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  {/* height={36} */}
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ paddingTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400">No books found</p>
            )}
          </div>
        </div>

        {/* Bar Chart: Users by Role */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Users by Role
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roleData}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
