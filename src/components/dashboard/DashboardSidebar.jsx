"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { BsGrid1X2 } from "react-icons/bs";
import {
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiPlus,
  FiSettings,
  FiX,
} from "react-icons/fi";
import { RiFileHistoryFill } from "react-icons/ri";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
// import {
//   BsGrid1X2,
//   FiPackage,
//   FiHistory,
//   FiSettings,
//   FiPlus,
//   FiHelpCircle,
//   FiLogOut,
//   FiMenu,
//   FiX
// } from "react-icons/fi";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // নেভিগেশন আইটেম লিস্ট
  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: BsGrid1X2 },
    { name: "Inventory", href: "/dashboard/inventory", icon: FiPackage },
    { name: "History", href: "/dashboard/history", icon: RiFileHistoryFill },
    { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
  ];

  return (
    <>
      {/* --- MOBILE TOP BAR NAVIGATION --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D3B66] flex items-center justify-between px-4 z-50 border-b border-white/5 shadow-md">
        <Link
          href="/dashboard"
          className="relative block w-[140px] h-[34px] select-none"
        >
          <Image
            src="/BookDrop-white.png"
            alt="BookDrop Logo"
            fill
            className="object-contain "
            priority
          />
        </Link>
        <Button
          isIconOnly
          variant="light"
          className="text-white bg-white/5 hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {/* --- BACKDROP FOR MOBILE --- */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- CORE SIDEBAR NAVIGATION CONTAINER --- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-[260px] bg-[#0A2540] text-white flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 pt-24" : "-translate-x-full lg:pt-6"
        }`}
      >
        {/* UPPER PORTION */}
        <div className="space-y-8">
          {/* 1. BRAND LOGO SECTION (Hidden in mobile top-bar layout view) */}
          {/* ২. ব্র্যান্ড লোগো হেডার */}
          <div className="relative z-10 w-full self-start hidden lg:block">
            <Link
              href="/"
              className="relative block w-[160px] h-[40px] select-none"
            >
              <Image
                src="/BookDrop-white.png"
                alt="BookDrop Logo"
                fill
                sizes="180px"
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* 2. ADMIN USER PROFILE CARD CONTAINER */}
          <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md p-3 rounded-xl border border-white/[0.06] select-none hover:bg-white/[0.06] transition-colors group">
            {/* অ্যাভাটার কন্টেইনার উইথ গ্লো ইফেক্ট */}
            <Avatar
              size="md"
              className="w-10 h-10 ring-2 ring-white/10 group-hover:ring-emerald-500/30 transition-all shrink-0"
            >
              <Avatar.Image
                alt={user?.name || "User Avatar"}
                src={user?.image}
              />
              <Avatar.Fallback className="bg-emerald-500/10 text-emerald-400 font-black text-sm uppercase">
                {user?.name ? user?.name[0] : "U"}
              </Avatar.Fallback>
            </Avatar>

            {/* ইউজার ইনফরমেশন টেক্সট গ্রিড */}
            <div className="flex flex-col min-w-0 flex-1 space-y-0.5">
              <span className="text-[13px] font-black tracking-tight text-slate-100 truncate group-hover:text-white transition-colors">
                {user?.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 truncate leading-none mb-1 block">
                {user?.email}
              </span>

              {/* রোল আইডেন্টিফায়ার ব্যাজ (মিনিমালিস্ট ও মডার্ন লুক) */}
              <div className="flex">
                <span className="text-[9px] font-black tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md select-none leading-normal">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* 3. DYNAMIC MENU NAVIGATION LINKS */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full h-11 px-4 rounded-lg flex items-center gap-3 text-[13px] font-bold transition-all ${
                    isActive
                      ? "bg-[#0D3B66] text-white shadow-lg shadow-black/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 4. ACTION INTERACTION BUTTON */}
          <div className="pt-2">
            <Button
              className="w-full h-10 bg-[#F46036] hover:bg-[#D34A26] text-white font-black text-xs rounded-lg uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              onClick={() => console.log("New Shipment triggered")}
            >
              <FiPlus size={14} strokeWidth={3} />
              <span>New Shipment</span>
            </Button>
          </div>
        </div>

        {/* LOWER PORTION: SYSTEM SYSTEM LINKS */}
        <div className="space-y-1 border-t border-white/5 pt-4">
          <Link
            href="/dashboard/support"
            onClick={() => setIsOpen(false)}
            className="w-full h-10 px-4 rounded-lg flex items-center gap-3 text-[13px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <FiHelpCircle size={16} />
            <span>Support</span>
          </Link>

          <button
            type="button"
            onClick={() => console.log("Logout action")}
            className="w-full h-10 px-4 rounded-lg flex items-center gap-3 text-[13px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all text-left bg-transparent border-none cursor-pointer"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
