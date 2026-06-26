import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiEdit2, FiTrash2, FiMessageSquare } from 'react-icons/fi';

const MyReviews = () => {
    
    const mockReviews = [
        {
            _id: "1",
            bookTitle: "Atomic Habits",
            author: "James Clear",
            bookImage: "https://i.ibb.co/N2rkSjGT/Screenshot-2026-06-21-162419.png", // আপনার আগের স্ক্রিনশটের ইমেজ
            rating: 5,
            date: "June 25, 2026",
            reviewText: "This book completely changed my daily routine. The concept of 1% improvement every day is so powerful and practical. Highly recommended for everyone!",
        },
        {
            _id: "2",
            bookTitle: "Deep Work",
            author: "Cal Newport",
            bookImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&auto=format&fit=crop", // ডামি ইমেজ
            rating: 4,
            date: "June 20, 2026",
            reviewText: "Great insights on how to focus in a distracted world. The first half is a bit theoretical, but the actionable advice in the second half is pure gold.",
        }
    ];

   
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    index < rating ? (
                        <FaStar key={index} className="text-amber-400 size-4" />
                    ) : (
                        <FaRegStar key={index} className="text-slate-300 size-4" />
                    )
                ))}
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <FiMessageSquare className="text-blue-600" />
                        My Reviews
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage and view all the feedback you have shared on books.
                    </p>
                </div>
                <div className="hidden sm:block px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold text-sm">
                    Total Reviews: {mockReviews.length}
                </div>
            </div>

            {/* Reviews Grid */}
            {mockReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockReviews.map((review) => (
                        <div 
                            key={review._id} 
                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                        >
                            <div>
                                {/* Book Info & Actions */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-14 h-20 relative flex-shrink-0 bg-slate-100 rounded-md overflow-hidden border border-slate-200">
                                            <Image 
                                                src={review.bookImage} 
                                                alt={review.bookTitle}
                                                fill
                                                className="object-cover"
                                                sizes="56px"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{review.bookTitle}</h3>
                                            <p className="text-sm text-slate-500 mb-1">{review.author}</p>
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>

                                    {/* Action Buttons (Edit & Delete) */}
                                    <div className="flex items-center gap-2">
                                        <button 
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            aria-label="Edit Review"
                                        >
                                            <FiEdit2 size={16} />
                                        </button>
                                        <button 
                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                                            aria-label="Delete Review"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {review.reviewText}
                                </p>
                            </div>

                            {/* Date */}
                            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                                Posted on {review.date}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="w-full bg-white rounded-2xl border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                        <FiMessageSquare size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-1">No reviews yet</h3>
                    <p className="text-slate-500 max-w-sm">
                        You have not shared your thoughts on any books. Once you write a review, it will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyReviews;