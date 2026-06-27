import { getOrderedBookForAdmin } from '@/lib/api/books';
import React from 'react';
import { FiDollarSign, FiCalendar, FiUser, FiHash, FiBook, FiActivity } from 'react-icons/fi';

const ViewAllTransactions = async () => {
    // API থেকে ট্রানজ্যাকশন/অর্ডারের সব ডাটা ফেচ করা হচ্ছে
    const orderedBooks = await getOrderedBookForAdmin();

    // ডেট ফরম্যাট করার হেল্পার ফাংশন
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // স্ট্যাটাস অনুযায়ী ব্যাজের কালার দেওয়ার ফাংশন
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'dispatched':
                return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'pending':
                return 'bg-amber-50 text-amber-600 border-amber-200';
            default:
                return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                        All Transactions
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm md:text-base">
                        View and monitor all payment records across the platform.
                    </p>
                </div>
                <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-semibold text-sm border border-indigo-100 inline-flex items-center gap-2">
                    <FiDollarSign />
                    Total Transactions: {orderedBooks?.length || 0}
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                
                {/* X-axis (Horizontal) Scrollbar: 
                    এখানে overflow-x-auto এবং min-w-[1000px] দেওয়া হয়েছে। 
                    যার ফলে স্ক্রিন ছোট হলে বা কলাম বেশি হলে সুন্দর একটি ডান-বামের স্ক্রলবার আসবে।
                */}
                <div className="w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        
                        {/* Table Head */}
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr className="text-slate-600 text-sm">
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiHash className="text-slate-400" />
                                        Transaction ID
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiUser className="text-slate-400" />
                                        User Email
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiBook className="text-slate-400" />
                                        Librarian Email
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiDollarSign className="text-slate-400" />
                                        Amount
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiActivity className="text-slate-400" />
                                        Status
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="text-slate-400" />
                                        Date
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-100">
                            {orderedBooks && orderedBooks.length > 0 ? (
                                orderedBooks.map((order) => (
                                    <tr 
                                        key={order._id} 
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        {/* Transaction ID */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-slate-700" title={order.sessionId || order._id}>
                                                {order.sessionId ? order.sessionId.replace('cs_test_', '...').slice(-12) : order._id.slice(-8)}
                                            </div>
                                        </td>

                                        {/* User Email (Buyer) */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600 font-medium">
                                                {order.buyerDetails?.email || order.userEmail || "Unknown"}
                                            </div>
                                        </td>

                                        {/* Librarian Email (Seller/Owner) */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-blue-600 font-medium">
                                                {order.librarianDetails?.email || "Unknown"}
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-700">
                                                ${parseFloat(order.price || 0).toFixed(2)}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                                                {order.orderStatus || "Unknown"}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-500">
                                                {formatDate(order.OrderAt || order.createdAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Empty State */
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <FiDollarSign className="size-10 mb-3 text-slate-300" />
                                            <p className="text-lg font-medium text-slate-500">No transactions found</p>
                                            <p className="text-sm">There are currently no payment records in the system.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewAllTransactions;