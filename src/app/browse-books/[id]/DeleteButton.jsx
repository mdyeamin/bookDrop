"use client";

import { handleDeleteBook } from "@/lib/action/books";
import { Button } from "@heroui/react";
import React, { useTransition } from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteButton = ({ id }) => {

  const [isPending, startTransition] = useTransition();

  const onClickDelete = () => {
   
    if (window.confirm("Are you sure you want to delete this book?")) {
      startTransition(async () => {
        await handleDeleteBook(id);
      });
    }
  };

  return (
    <Button
      onClick={onClickDelete}
      isLoading={isPending} 
      size="sm"
      variant="bordered"
      className="bg-white border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-semibold h-9 px-4 rounded flex items-center gap-2 transition-colors"
    >
      <FiTrash2 size={13} />
      Delete Record
    </Button>
  );
};

export default DeleteButton;