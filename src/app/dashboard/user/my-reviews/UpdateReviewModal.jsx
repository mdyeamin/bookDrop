"use client";
import React, { useState } from "react";
import { Button, Form, Modal, Surface } from "@heroui/react";
import { FiEdit2, FiMessageSquare } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { editUserReview } from "@/lib/action/reviews";


const UpdateReviewModal = ({ item }) => {
  
  const [rating, setRating] = useState(item?.rating || 0);
  const [hover, setHover] = useState(0);

  const handleUpdateReview =async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating!");
      return;
    }

    
    const formData = new FormData(e.currentTarget);
     const userReview = Object.fromEntries(formData.entries());

    
    const payload = {
      ...userReview,
      rating: rating,
      
    };
console.log(payload);

const res = await editUserReview(item?._id,payload)
    

    
  };

  return (
    <Modal>
      {/* Trigger Button (Edit Icon) */}
      <Button
        variant="ghost"
        className="p-2 min-w-0 w-auto h-auto bg-transparent text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        aria-label="Edit Review"
      >
        <FiEdit2 size={16} />
      </Button>

      {/* Modal Content */}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              
              <Modal.Heading>Update Review</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-slate-500">
                Modify your rating and review below. Your updated feedback will be saved.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default" className="bg-transparent border-none p-0 shadow-none">
                
                <Form  id="update-review-form" onSubmit={handleUpdateReview} className="flex flex-col gap-5">
                  
                  {/* Star Rating Section */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Update Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                          <FaStar
                            key={index}
                            size={24}
                            className={`cursor-pointer transition-colors ${
                              currentRating <= (hover || rating)
                                ? "text-[#FBBF24]" // Yellow Color
                                : "text-slate-300" // Ash Color
                            }`}
                            onClick={() => setRating(currentRating)}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Textarea Section */}
                  <div>
                    <label
                      htmlFor="review"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      rows="4"
                      defaultValue={item?.review} 
                      className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 text-sm focus:outline-none focus:border-[#FA5D39] focus:ring-1 focus:ring-[#FA5D39] transition-shadow resize-none"
                      placeholder="Update your thoughts..."
                      required
                    ></textarea>
                  </div>
                   <Modal.Footer>
              <Button slot="close" variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                Cancel
              </Button>
             
              <Button type="submit" form="update-review-form" slot="close" className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                Save Changes
              </Button>
            </Modal.Footer>
                </Form>
              </Surface>
            </Modal.Body>

           
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateReviewModal;