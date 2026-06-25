import { getBookById } from "@/lib/api/books";
import Image from "next/image";
import Link from "next/link";
import { BsTruck } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { BiBookOpen, BiCalendar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FiChevronRight, FiBookmark, FiEdit2, FiEyeOff } from "react-icons/fi";
import { Button } from "@heroui/react";
import { getDeliveryOrder } from "@/lib/api/order";
import { getUserSession } from "@/lib/core/session";
import { EditBookModal } from "@/components/dashboard/librarian/EditBookModal";
import DeleteButton from "./DeleteButton";
import Unpublished from "./Unpublished";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBookById(id);
  console.log(book);

  const userSession = await getUserSession();
  const user = userSession?.user;
  const orderList = await getDeliveryOrder(user?.id) || [];
  console.log(orderList);

  // Safe check with ?.toString() and optional chaining to prevent crash if not found
  const isExistInOrderList = orderList.find((order) => order.productId === book._id.toString());
  console.log("exist", isExistInOrderList?.orderStatus);

  // Check if order exists AND status is delivered
  const isDelivered = isExistInOrderList?.orderStatus === 'delivered';

  if (!book) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[#0A2540] font-bold text-2xl">
        Book not found
      </div>
    );
  }

  const editButton = (
    <Button
      size="sm"
      variant="bordered"
      className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-semibold h-9 px-4 rounded flex items-center gap-2"
    >
      <FiEdit2 size={13} />
      Edit Details
    </Button>
  );

  const isLibrarianOwner = user?.id && book.userId === user.id;

  let hasAlreadyRequested = false;

  if (user?.id && !isLibrarianOwner) {
    try {
      hasAlreadyRequested = orderList.some(
        (order) => order.productId === book._id.toString(),
      );
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  }

  const isGloballyAvailable = book.status !== "checked_out";

  const canRequest =
    isGloballyAvailable && !hasAlreadyRequested && !isLibrarianOwner;

  let statusText = "Available";
  let statusColor = "bg-[#FF5A36]";

  if (isLibrarianOwner) {
    statusText = isGloballyAvailable ? "Available" : "Checked Out";
    statusColor = isGloballyAvailable ? "bg-[#FF5A36]" : "bg-slate-400";
  } else if (hasAlreadyRequested) {
    statusText = "Already Requested";
    statusColor = "bg-blue-500";
  } else if (!isGloballyAvailable) {
    statusText = "Checked Out";
    statusColor = "bg-slate-400";
  }

  const descriptionParagraphs = book.description
    ? book.description.split("\n\n")
    : [];
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-8 font-semibold">
          <Link
            href="/browse"
            className="hover:text-[#0A2540] transition-colors"
          >
            Browse Books
          </Link>
          <FiChevronRight size={14} className="mt-0.5" />
          <span className="hover:text-[#0A2540] cursor-pointer transition-colors">
            {book.category || "Category"}
          </span>
          <FiChevronRight size={14} className="mt-0.5" />
          <span className="text-[#0A2540] font-bold">{book.title}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Container & Quick Stats */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Book Cover Presentation Card */}
            <div className="relative bg-[#EAECEF] rounded-2xl p-8 border border-slate-200 flex items-center justify-center min-h-[460px] shadow-sm">
              {/* Dynamic Availability Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-700 shadow-sm border border-slate-100 flex items-center gap-2 z-10">
                <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                {statusText}
              </div>

              {/* Book Image with 3D Shadow */}
              <div className="relative w-full max-w-[260px] aspect-[2/3] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-md transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover rounded-md"
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Quick Stats Grid (Delivery & Format) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <BsTruck size={22} className="text-slate-400 mb-2.5" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Delivery Fee
                </span>
                <span className="text-2xl font-extrabold text-[#0A2540]">
                  {book.deliveryFee === "0" || book.deliveryFee === 0
                    ? "Free"
                    : `$${book.deliveryFee}`}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm">
                <BiBookOpen size={22} className="text-slate-400 mb-2.5" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Format
                </span>
                <span className="text-2xl font-extrabold text-[#0A2540]">
                  Hardcover
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Details, and Call-to-Actions */}
          <div className="lg:col-span-8 flex flex-col pt-2">
            {/* Title & Author Headings */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0A2540] mb-5 leading-[1.1] tracking-tight">
              {book.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-base mb-8">
              <p className="text-slate-600">
                By{" "}
                <span className="font-bold text-[#103A62]">{book.author}</span>
              </p>
              <div className="w-px h-5 bg-slate-300 hidden sm:block"></div>

              {/* Dynamic Date Added */}
              <div className="flex items-center gap-1.5 text-slate-500 text-[13px] font-medium">
                <BiCalendar size={16} />
                Added {formattedDate}
              </div>
              <div className="w-px h-5 bg-slate-300 hidden sm:block"></div>

              {/* Reviews Section */}
              <div className="flex items-center gap-1 text-[#D97706]">
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} />
                <FaStar size={14} className="text-[#FDE68A]" />
              </div>
              <span className="text-[13px] text-slate-600 font-semibold tracking-wide">
                (4.8 / 124 Verified Reviews)
              </span>
            </div>

            {/* Description Paragraphs */}
            <div className="text-slate-600 text-[15px] leading-[1.8] space-y-5 mb-10 pr-0 lg:pr-8">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <p>{book.description}</p>
              )}
            </div>

            {/* Specs & Metadata Box */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  ISBN
                </p>
                <p className="text-sm font-semibold text-[#0A2540]">
                  978-0-12-345678-9
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Publisher
                </p>
                <p className="text-sm font-semibold text-[#0A2540]">
                  LogisPress
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Weight
                </p>
                <p className="text-sm font-semibold text-[#0A2540]">
                  1.2 lbs / 540g
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Location
                </p>
                <p className="text-sm font-semibold text-[#0A2540]">
                  Zone A, Shelf 4
                </p>
              </div>
            </div>

            {/* Main Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              {canRequest ? (
                user ? (
                  <form action={"/api/payment"} method="POST">
                    <input
                      type="hidden"
                      name="price"
                      value={book.deliveryFee}
                    />
                    <input type="hidden" name="title" value={book.title} />
                    <input
                      type="hidden"
                      name="productId"
                      value={book._id.toString()}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="bg-[#FA5D39] hover:bg-[#E54823] text-white font-bold px-8 h-12 rounded-lg flex items-center gap-2.5 transition-colors shadow-sm"
                    >
                      <BsTruck size={18} strokeWidth={0.5} />
                      Request Delivery
                    </Button>
                  </form>
                ) : (
                  <Link href={"/auth/signin"}>
                    <Button
                      type="button"
                      size="lg"
                      className="bg-[#FA5D39] hover:bg-[#E54823] text-white font-bold px-8 h-12 rounded-lg flex items-center gap-2.5 transition-colors shadow-sm"
                    >
                      <IoMdLogIn size={18} strokeWidth={0.5} />
                      Please Login
                    </Button>
                  </Link>
                )
              ) : (
                <Button
                  size="lg"
                  isDisabled
                  className="bg-slate-200 text-slate-500 font-bold px-8 h-12 rounded-lg flex items-center gap-2.5 shadow-sm opacity-80"
                >
                  <BsTruck size={18} strokeWidth={0.5} />
                  {isLibrarianOwner
                    ? "Your Book"
                    : hasAlreadyRequested
                      ? "Already in Reading List"
                      : "Currently Unavailable"}
                </Button>
              )}

              {user && (
                <Button
                  size="lg"
                  variant="bordered"
                  className="bg-white border-slate-300 text-[#0A2540] hover:bg-slate-50 font-bold px-8 h-12 rounded-lg flex items-center gap-2.5 transition-colors"
                >
                  <FiBookmark size={18} />
                  Save for Later
                </Button>
              )}
            </div>

            {/* Review Section - ONLY visible if order status is 'delivered' */}
            {isDelivered && (
              <div className="border-t border-slate-200 pt-8 mt-4 mb-8">
                <h3 className="text-xl font-bold text-[#0A2540] mb-5">
                  Share Your Thoughts
                </h3>
                <form className="flex flex-col gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Rate this book
                    </label>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <FaStar size={24} className="hover:text-[#FDE68A] cursor-pointer transition-colors" />
                      <FaStar size={24} className="hover:text-[#FDE68A] cursor-pointer transition-colors" />
                      <FaStar size={24} className="hover:text-[#FDE68A] cursor-pointer transition-colors" />
                      <FaStar size={24} className="hover:text-[#FDE68A] cursor-pointer transition-colors" />
                      <FaStar size={24} className="hover:text-[#FDE68A] cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="review" className="block text-sm font-bold text-slate-700 mb-2">
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
                </form>
              </div>
            )}

            {/* Provider Operations Divider & Admin Actions */}
            {isLibrarianOwner && (
              <div className="border-t border-slate-200 pt-6 mt-auto">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-4">
                  Provider Operations
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  <EditBookModal book={book} editButton={editButton} />
                  <Unpublished id={book._id.toString()} />
                  <DeleteButton id={book._id.toString()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;