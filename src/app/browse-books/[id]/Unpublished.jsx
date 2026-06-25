'use client'
import { unpublishBookByLibrarian } from "@/lib/action/books";
import { Button } from "@heroui/react";
import React from "react";
import { FiEyeOff } from "react-icons/fi";

const Unpublished = ({id}) => {
  return (
    <Button
      onClick={() => unpublishBookByLibrarian(id, "unpublished")}
      size="sm"
      variant="bordered"
      className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-semibold h-9 px-4 rounded flex items-center gap-2"
    >
      <FiEyeOff size={13} />
      Unpublish
    </Button>
  );
};

export default Unpublished;
