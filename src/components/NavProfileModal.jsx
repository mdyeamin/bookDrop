"use client";

import React, { useState } from "react";
import { Avatar, Button, Popover } from "@heroui/react";
import { FiUser, FiLogOut, FiSettings, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfileModal = ({user}) => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-6">
      <Popover placement="bottom-end" backdrop="opaque">
        {/* ১. ট্রিগার: যেখানে ক্লিক করলে মেনু ওপেন হবে */}
        <Popover.Trigger aria-label="User profile">
          <button type="button" className="flex items-center gap-2.5 outline-none group bg-transparent border-none cursor-pointer">
            <Avatar size="sm" className="ring-2 ring-transparent group-hover:ring-[#0D3B66]/20 transition-all">
              <Avatar.Image
                alt={user?.name}
                src={user?.image}
              />
              <Avatar.Fallback className="bg-[#0D3B66]/5 text-[#0D3B66] font-bold text-xs">{user?.name[0]+user?.name[1]}</Avatar.Fallback>
            </Avatar>
           
          </button>
        </Popover.Trigger>

        {/* ২. মোডাল কন্টেন্ট কার্ড */}
        <Popover.Content className="w-[300px] bg-white rounded-2xl border border-gray-100 shadow-[0_15px_50px_rgba(13,59,102,0.08)] p-4">
          <Popover.Dialog className="outline-none">
            
            {/* প্রোফাইল হেডার সেকশন */}
            <Popover.Heading>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar size="md" className="w-12 h-12">
                    <Avatar.Image
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback className="bg-[#0D3B66]/5 text-[#0D3B66] font-bold">SJ</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-black text-slate-800 text-[15px] tracking-tight leading-tight">{user?.name}</p>
                    <p className="text-[12px] font-medium text-slate-400">{user?.email}</p>
                  </div>
                </div>

                
                
              </div>
            </Popover.Heading>


            

            <div className="my-3.5 bg-gray-100" />

            
            <div className="space-y-1">
              <Link href="/profile" className="w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-[#0D3B66] transition-colors text-[13px] font-semibold group">
                <FiUser className="text-slate-400 group-hover:text-[#0D3B66] size-4 transition-colors" />
                <span>My Profile</span>
              </Link>

              <Link href="/settings" className="w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-[#0D3B66] transition-colors text-[13px] font-semibold group">
                <FiSettings className="text-slate-400 group-hover:text-[#0D3B66] size-4 transition-colors" />
                <span>Account Settings</span>
              </Link>

              <div className="my-1 bg-gray-50" />

              <button 
                
                 onClick={async () =>
                      await authClient.signOut(router.push("/auth/signin"))
                    }
                className="w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-rose-600 hover:bg-rose-50 transition-colors text-[13px] font-bold group border-none text-left bg-transparent cursor-pointer"
              >
                <FiLogOut className="text-rose-400 group-hover:text-rose-600 size-4 transition-colors" />
                <span>Log Out</span>
              </button>
            </div>

          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default ProfileModal;