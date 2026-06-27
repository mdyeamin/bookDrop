import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMessageSquare, FiBook, FiCalendar } from 'react-icons/fi';
import { getUserReviews } from '@/lib/api/reviews';
import DeleteReview from './DeleteReview';
import UpdateReviewModal from './UpdateReviewModal';
import { getUserSession } from '@/lib/core/session';

const MyReviews = async () => {
    // ডাটাবেস থেকে সব রিভিউ এবং ইউজারের সেশন কল করা হচ্ছে
    const allReviews = await getUserReviews() || [];
    const session = await getUserSession();
    
    // সেশন অবজেক্টের স্ট্রাকচার অনুযায়ী ইউজারের আইডি বের করা
    const currentUser = session?.user;
    const currentUserId = currentUser?.id || currentUser?._id; 

    // 🚀 মূল কাজ: শুধুমাত্র বর্তমান ইউজারের রিভিউগুলো ফিল্টার করা
    const reviews = allReviews.filter((item) => {
        // আপনার স্ক্রিনশট অনুযায়ী userInfo এর ভেতরে id আছে
        return item?.userInfo?.id === currentUserId;
    });

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    index < (rating || 0) ? (
                        <FaStar key={index} className="text-[#FBBF24] size-4" /> 
                    ) : (
                        <FaRegStar key={index} className="text-slate-200 size-4" />
                    )
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <span className="p-2 bg-blue-50 rounded-xl">
                            <FiMessageSquare className="text-blue-600 size-6" />
                        </span>
                        My Reviews
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
                        Manage and view all the feedback you have shared on books.
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-sm shadow-sm">
                    Total Reviews: <span className="text-blue-600">{reviews.length}</span>
                </div>
            </div>

            {/* Reviews Grid */}
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {reviews.map((item) => {
                        
                        // Crash Protection
                        const reviewText = typeof item.review === 'object' 
                            ? item.review?.review 
                            : item.review;

                        return (
                            <div 
                                key={item._id} 
                                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group"
                            >
                                {/* Main Content Area */}
                                <div className="p-5 md:p-6 flex-grow flex flex-col">
                                    
                                    {/* Top: Book Info & Actions */}
                                    <div className="flex justify-between items-start mb-5 gap-4">
                                        <div className="flex gap-4 items-center w-full">
                                            {/* Book Image */}
                                            <div className="w-16 h-24 relative flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden shadow-sm border border-slate-200/60 flex items-center justify-center">
                                                {item.bookInfo?.image ? (
                                                    <Image 
                                                        src={item.bookInfo.image} 
                                                        alt={item.bookInfo?.title || "Book cover"}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <FiBook className="text-slate-300 size-6" />
                                                )}
                                            </div>
                                            
                                            {/* Book Details */}
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 line-clamp-1" title={item.bookInfo?.title}>
                                                    {item.bookInfo?.title || "Unknown Book"}
                                                </h3>
                                                <p className="text-sm font-medium text-slate-500 mb-2.5 line-clamp-1" title={item.bookInfo?.author}>
                                                    By {item.bookInfo?.author || "Unknown Author"}
                                                </p>
                                                {renderStars(item.rating)}
                                            </div>
                                        </div>

                                        {/* Action Buttons (Edit & Delete) grouped in a pill */}
                                        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100 opacity-90 group-hover:opacity-100 transition-opacity">
                                            <UpdateReviewModal item={item}/> 
                                            <div className="w-[1px] h-5 bg-slate-200"></div> {/* Divider */}
                                            <DeleteReview id={item?._id}/>
                                        </div>
                                    </div>

                                    {/* Review Text Block */}
                                    <div className="relative bg-blue-50/50 rounded-xl p-4 mt-2 flex-grow border border-blue-100/50">
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium italic">
                                            "{reviewText || "No review text provided."}"
                                        </p>
                                    </div>
                                </div>

                                {/* Footer: Date */}
                                <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                        <FiCalendar size={14} className="mb-0.5" />
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Empty State */
                <div className="w-full bg-white rounded-3xl border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-5">
                        <FiMessageSquare size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No reviews yet</h3>
                    <p className="text-slate-500 max-w-md font-medium">
                        You haven't shared your thoughts on any books yet. Once you write a review, it will beautifully appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyReviews;