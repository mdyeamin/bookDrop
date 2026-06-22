import { Button } from "@heroui/react";
import Image from "next/image";

import { BsTruck } from "react-icons/bs";
const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative h-64 bg-slate-100">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute flex items-center gap-1.5 top-3 right-3 bg-white/95 px-2 py-1 rounded-md text-[11px] font-bold shadow-sm border border-slate-100">
          <BsTruck size={14} className="text-slate-600" />
          <span className="text-slate-800">
            {book.deliveryFee === "0" || book.deliveryFee === 0
              ? "Free"
              : `$${book.deliveryFee}`}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          {book.category}
        </p>
        <h3 className="text-lg font-bold text-[#0A2540] truncate">
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{book.author}</p>

        <Button className="w-full bg-slate-100 hover:bg-slate-200 text-[#0A2540] font-semibold">
          Request Book
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
