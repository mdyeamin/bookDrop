'use client'
import { deleteUserReview } from "@/lib/action/reviews";
import { Button } from "@heroui/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteReview = ({id}) => {

    
  return (
    <Button
    variant=""
    onClick={()=> deleteUserReview(id)}
      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
      aria-label="Delete Review"
    >
      <FiTrash2 size={16} />
    </Button>
  );
};

export default DeleteReview;
