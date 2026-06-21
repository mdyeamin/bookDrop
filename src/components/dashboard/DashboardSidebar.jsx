"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";

import {
  FiBookOpen,
  FiCheckSquare,
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiPackage,
  FiPlus,
  FiPlusCircle,
  FiTruck,
  FiUsers,
  FiX,
} from "react-icons/fi";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import SidebarSkeleton from "../Loading/SidebarSkeleton";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  // নেভিগেশন আইটেম লিস্ট

  const userNavItems = [
    {
      name: "Overview",
      href: "/dashboard/user",
      icon: FiGrid,
    },
    {
      name: "Delivery History",
      href: "/dashboard/user/delivery-history",
      icon: FiTruck,
    },
    {
      name: "My Reading List",
      href: "/dashboard/user/reading-list",
      icon: FiBookOpen,
    },
    {
      name: "My Reviews",
      href: "/dashboard/user/reviews",
      icon: FiMessageSquare,
    },
  ];
  const librarianNavItems = [
    {
      name: "Overview",
      href: "/dashboard/librarian",
      icon: FiGrid,
    },
    {
      name: "Add Book",
      href: "/dashboard/librarian/add-book",
      icon: FiPlusCircle,
    },
    {
      name: "Manage Inventory",
      href: "/dashboard/librarian/inventory",
      icon: FiPackage,
    },
    {
      name: "Manage Deliveries",
      href: "/dashboard/librarian/deliveries",
      icon: FiTruck,
    },
  ];
  const adminNavItems = [
    {
      name: "Overview",
      href: "/dashboard/admin",
      icon: FiGrid,
    },
    {
      name: "Book Approval Queue",
      href: "/dashboard/admin/approvals",
      icon: FiCheckSquare,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/users",
      icon: FiUsers,
    },
    {
      name: "Manage All Books",
      href: "/dashboard/admin/books",
      icon: FiBookOpen,
    },
    {
      name: "View All Transactions",
      href: "/dashboard/admin/transactions",
      icon: FiCreditCard,
    },
  ];

  const navLinksMap = {
    user: userNavItems,
    librarian: librarianNavItems,
    admin: adminNavItems,
  };
  const navItems = navLinksMap[user?.role || "user"] || {};
  


  if (isPending) {
  return <SidebarSkeleton />; 
}

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
          <div className="flex items-center gap-4 bg-transparent p-1 select-none w-full">
            {/* ১. অ্যাভাটার উইথ থিক সার্কুলার রিং (image_854ccb.png এর মতো) */}
            <Avatar
              size="md"
              className={`w-12 h-12 ring-[3px] bg-transparent shrink-0 transition-all duration-300 ${
                user?.role === "admin"
                  ? "ring-rose-500/30"
                  : user?.role === "librarian"
                    ? "ring-sky-500/30"
                    : "ring-slate-500/30"
              }`}
            >
              <Avatar.Image
                alt={user?.name || "User Profile"}
                src={user?.image}
              />
              <Avatar.Fallback className="bg-white/10 text-white font-bold text-sm uppercase">
                {user?.name ? user?.name[0] : "U"}
              </Avatar.Fallback>
            </Avatar>

            {/* ২. টেক্সট লেআউট */}
            <div className="flex flex-col text-left min-w-0">
              {/* প্রথম লাইন: ইউজারের নাম */}
              <span className="text-[16px] font-bold text-white tracking-wide leading-tight truncate">
                {user?.name}
              </span>

              {/* দ্বিতীয় লাইন: ডাইনামিক রোল কালার (প্রফেশনাল সফট টোন) */}
              <span
                className={`text-[13px] font-black tracking-wider uppercase truncate mt-1 transition-colors duration-300 ${
                  user?.role === "admin"
                    ? "text-rose-400"
                    : user?.role === "librarian"
                      ? "text-sky-400"
                      : "text-emerald-400"
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* 3. DYNAMIC MENU NAVIGATION LINKS */}
          <nav className="space-y-1">
            {navItems.map((item) => {
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
            onClick={async () =>
              await authClient.signOut(router.push("/auth/signin"))
            }
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
