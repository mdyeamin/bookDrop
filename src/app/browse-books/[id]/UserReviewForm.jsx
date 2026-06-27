"use client";
import { postUserReview } from "@/lib/action/reviews";
import { Button, Form } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const UserReviewForm = ({ user, book }) => {
  console.log(user, book);
  const [rating, setRating] = useState(0);

  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast("Please select a star rating!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const userReview = Object.fromEntries(formData.entries());
    const userInfo = {
      ...user,
    };
    const bookInfo = {
      ...book,
    };

    const payload = {
      ...userReview,
      rating: rating,
      userInfo,
      bookInfo,
    };
    console.log(payload);

    const res = await postUserReview(payload);
  };
  return (
    <Form
      onSubmit={handleUserReview}
      className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <FaStar
              key={index}
              size={24}
              className={`cursor-pointer transition-colors ${
                currentRating <= (hover || rating)
                  ? "text-[#FBBF24]"
                  : "text-slate-300"
              }`}
              onClick={() => setRating(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>
      <div>
        <label
          htmlFor="review"
          className="block text-sm font-bold text-slate-700 mb-2"
        >
          Write a Review
        </label>
        <textarea
          id="review"
          name="review"
          rows="4"
          className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 text-sm focus:outline-none focus:border-[#FA5D39] focus:ring-1 focus:ring-[#FA5D39] transition-shadow"
          placeholder="What did you think about this book? Your review helps others!"
          required
        ></textarea>
      </div>
      <Button
        type="submit"
        className="bg-[#0A2540] hover:bg-[#103A62] text-white font-bold px-8 h-11 rounded-lg self-start shadow-sm transition-colors"
      >
        Submit Review
      </Button>
    </Form>
  );
};

export default UserReviewForm;
