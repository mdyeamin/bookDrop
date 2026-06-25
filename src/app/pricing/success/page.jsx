import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiHome, FiMail, FiPackage, FiBook } from "react-icons/fi";
import { Button } from "@heroui/react";
import { postPaymentData } from "@/lib/action/order";


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

 
  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // Retrieve session details from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id);
  
  const { status, metadata, amount_total, currency } = session;
  

  // Extract values from your custom metadata
  const bookTitle = metadata?.title || "Book Delivery";
  const customerEmail = metadata?.userEmail || session.customer_details?.email || "N/A";

  // Format the amount (Stripe stores amounts in cents)
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "usd",
  }).format((amount_total || 0) / 100);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await postPaymentData({...metadata,sessionId: session_id})
    console.log("metadata",metadata);
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#F8FAFC] to-white py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Section */}
          <div className="bg-[#0A2540] px-8 py-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-400/10 rounded-full flex items-center justify-center mb-6 border border-emerald-400/20 shadow-[0_0_40px_rgba(52,211,153,0.2)]">
              <FiCheckCircle className="text-emerald-400 size-10" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-slate-300 text-[15px]">
              Your delivery request for the book has been processed.
            </p>
          </div>

          {/* Body Section with Metadata Details */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-[#0A2540] mb-4">
              Transaction Details
            </h2>
            
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 space-y-4 mb-8 text-[15px]">
              
              {/* Item Title from Metadata */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium whitespace-nowrap mr-4">Item</span>
                <span className="text-[#0A2540] font-bold text-right flex items-center justify-end gap-2 text-base">
                  <FiBook className="text-slate-400 shrink-0" />
                  <span className="line-clamp-2">{bookTitle}</span>
                </span>
              </div>

              {/* Amount Paid */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Amount Paid</span>
                <span className="text-[#0A2540] font-extrabold text-lg">
                  {formattedAmount}
                </span>
              </div>
              
              {/* Email Address from Metadata */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Email Address</span>
                <span className="text-[#0A2540] font-medium text-right flex items-center gap-2">
                  <FiMail className="text-slate-400" />
                  {customerEmail}
                </span>
              </div>
              
              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Order Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Pending Delivery
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-sm text-center mb-8 leading-relaxed">
              We appreciate your business! A confirmation receipt has been sent to your email address.
            </p>

            {/* Action Buttons - Fixed the "as={Link}" Error */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/user/delivery-history" className="flex-1">
                <Button className="w-full bg-[#0A2540] hover:bg-[#153e66] text-white font-semibold h-12 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm">
                  <FiPackage size={18} />
                  View Order
                </Button>
              </Link>

              <Link href="/" className="flex-1">
                <Button variant="bordered" className="w-full bg-white border-slate-300 text-[#0A2540] hover:bg-slate-50 font-semibold h-12 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <FiHome size={18} />
                  Return Home
                </Button>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}