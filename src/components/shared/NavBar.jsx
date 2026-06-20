"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

import { MdMenu, MdClose } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

import ProfileModal from "../NavProfileModal";

const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("auth")) {
    return null;
  }
  if (pathname.includes("dashboard")) {
    return null;
  }

  // BookDrop Navigation Routes
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Books", path: "/browse-books" },
  ];

  if (user?.email) {
    navLinks.push({ name: "Dashboard", path: "/dashboard/user" });
  }
  // { name: "Dashboard", path: "/dashboard/user" },

  return (
    <>
      <nav className="w-full h-[68px] border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="relative block w-[160px] h-[40px] select-none"
          >
            <Image
              src="/BookDrop.png"
              alt="BookDrop Logo"
              fill
              sizes="160px"
              className="object-contain"
              priority
            />
          </Link>

          {/* --- Desktop Central Navigation Menu --- */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-[15px] font-semibold transition-colors duration-200 h-full flex items-center ${
                    isActive
                      ? "text-[#F46036]"
                      : "text-[#0D3B66] hover:text-[#F46036]/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-t-full bg-[#F46036]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- Desktop Utility Controls --- */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {/* Sign In Link */}
              {user ? (
                <>
                  <ProfileModal user={user} />
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="font-bold text-[15px] text-[#0D3B66] hover:text-[#F46036] transition-colors"
                >
                  Sign In
                </Link>
              )}
              {/* Get Started Button */}
              <Link
                href="#"
                className="bg-[#D34A26] text-white font-bold text-[15px] px-6 h-10 rounded-md shadow-md hover:bg-[#F46036] flex items-center justify-center transition-all whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* --- Small Devices Mobile Menu Trigger --- */}
          <div className="flex md:hidden items-center gap-3">
            <ProfileModal user={user} />
            <button
              onClick={() => setIsOpen(true)}
              className="text-[#0D3B66] p-1 text-2xl focus:outline-none"
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Drawer Overlay Sheet Layout --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-[290px] bg-white shadow-2xl z-50 p-6 flex flex-col justify-between md:hidden transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  {/* Mobile Drawer Logo */}
                  <div className="relative w-[140px] h-[36px] select-none">
                    <Image
                      src="/BookDrop.png"
                      alt="BookDrop Logo"
                      fill
                      sizes="140px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#0D3B66] p-1 text-2xl outline-none"
                  >
                    <MdClose />
                  </button>
                </div>

                {/* Mobile Route List Links Component */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-[16px] font-semibold py-3 px-4 rounded-md transition-all ${
                          isActive
                            ? "bg-coral-50/50 text-[#F46036]"
                            : "text-[#0D3B66] hover:bg-gray-50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Action Dynamic Footer Grid */}
              <div className="w-full border-t border-gray-100 pt-5 pb-2 select-none transition-colors duration-300">
                <div className="flex flex-col gap-3 w-full">
                  {!user && (
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="text-[#0D3B66] font-bold text-[16px] h-11 rounded-md border-2 border-[#0D3B66] flex items-center justify-center transition-all whitespace-nowrap"
                    >
                      Sign In
                    </Link>
                  )}

                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#D34A26] text-white font-bold text-[16px] h-11 rounded-md shadow-md hover:bg-[#F46036] flex items-center justify-center transition-all whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
