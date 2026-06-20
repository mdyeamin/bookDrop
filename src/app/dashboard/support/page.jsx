"use client";

import { Accordion, AccordionItem, Button, Input, TextArea } from "@heroui/react";
import React from "react";
import { FiBook, FiMail, FiMessageSquare, FiPhone, FiSend, FiShield } from "react-icons/fi";



const SupportPage = () => {
  
  // FAQ ডেটা সেট
  const faqs = [
    {
      title: "How do I track my book delivery?",
      content: "You can track your real-time shipment routing directly from your User Dashboard under the 'Delivery History' tab."
    },
    {
      title: "What is the maximum file size for uploading book covers?",
      content: "The system strictly allows images up to 500KB. We recommend using compressed JPG or PNG formats for smooth imgBB hosting upload."
    },
    {
      title: "Can a Librarian publish a book immediately?",
      content: "No. When a book is submitted, its initial status is strictly set to 'Pending Approval' and it requires Admin verification before going public."
    },
    {
      title: "How can I change my user role?",
      content: "User roles are assigned during registration. If you need to upgrade from a Reader to a Librarian, please contact the Admin panel via this support page."
    }
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    
    console.log("Support ticket submitted");
  };

  return (
    <div className="w-full space-y-10">
      
      {/* --- TOP HEADER SEKCTION --- */}
      <div className="space-y-2 select-none">
        <h1 className="text-3xl font-black tracking-tight text-[#0D3B66]">
          Support Center
        </h1>
        <p className="text-[14px] font-semibold text-slate-500 tracking-wide">
          Get real-time assistance with your reading journey and logistics operations.
        </p>
      </div>

      {/* --- QUICK CONTACT CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Email Support */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(13,59,102,0.02)] p-6 flex flex-col space-y-4">
          <div className="w-10 h-10 bg-[#0D3B66]/5 rounded-xl flex items-center justify-center text-[#0D3B66]">
            <FiMail size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-[#0D3B66] uppercase tracking-wider">Email Us</h3>
            <p className="text-[13px] text-slate-500 font-semibold">support@bookdrop.com</p>
          </div>
        </div>

        {/* Card 2: Logistics Helpline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(13,59,102,0.02)] p-6 flex flex-col space-y-4">
          <div className="w-10 h-10 bg-[#F46036]/5 rounded-xl flex items-center justify-center text-[#F46036]">
            <FiPhone size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-[#0D3B66] uppercase tracking-wider">Logistics Hotline</h3>
            <p className="text-[13px] text-slate-500 font-semibold">+1 (555) 234-5678</p>
          </div>
        </div>

        {/* Card 3: Live System Status */}
        <div className="bg-[#0D3B66] rounded-2xl shadow-[0_15px_35px_rgba(13,59,102,0.15)] p-6 flex flex-col justify-between text-white min-h-[140px]">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
            <FiShield size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block">System Status</span>
            <span className="text-[15px] font-extrabold tracking-tight block">All Networks Operational</span>
          </div>
        </div>
      </div>

      {/* --- TWO COLUMN LAYOUT: FAQ & CONTACT FORM --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: FAQ ACCORDION (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 select-none">
            <FiBook className="text-[#0D3B66] text-xl" strokeWidth={2.5} />
            <h2 className="text-lg font-black text-[#0D3B66] tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <Accordion variant="light" className="px-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.title}
                title={faq.title}
                className="text-slate-800 font-bold text-[14px] border-b border-gray-50 last:border-none py-2"
                classNames={{
                  title: "font-black text-[#0D3B66] text-[14px] tracking-tight",
                  content: "text-[13px] font-medium text-slate-500 leading-relaxed pt-1 pb-3"
                }}
              >
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* RIGHT: TICKET SUBMISSION FORM (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 select-none">
            <FiMessageSquare className="text-[#F46036] text-xl" strokeWidth={2.5} />
            <h2 className="text-lg font-black text-[#0D3B66] tracking-tight">Open a Support Ticket</h2>
          </div>

          <form onSubmit={handleSupportSubmit} className="space-y-4">
            {/* Subject Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase block">
                Subject Issue
              </label>
              <Input
                required
                placeholder="e.g., Delivery Delay or Account Upgrade"
                variant="bordered"
                classNames={{
                  inputWrapper: "border-gray-200 focus-within:border-[#0D3B66] rounded-lg bg-white h-11"
                }}
                className="text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase block">
                Explain your problem
              </label>
              <TextArea
                required
                placeholder="Describe your issue in detail so our logistics team can resolve it fast..."
                variant="bordered"
                rows={4}
                classNames={{
                  inputWrapper: "border-gray-200 focus-within:border-[#0D3B66] rounded-lg bg-white p-3"
                }}
                className="text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 outline-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#F46036] text-white font-bold text-xs rounded-lg shadow-md hover:bg-[#D34A26] transition-all duration-200 flex items-center justify-center uppercase tracking-wider gap-2 pt-0.5"
            >
              <FiSend size={13} strokeWidth={2.5} />
              <span>Submit Ticket</span>
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default SupportPage;