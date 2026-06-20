"use client";

import React, { useState } from "react";
import { Avatar, Button, Popover } from "@heroui/react";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfileModal = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <Popover placement="bottom-end" backdrop="opaque">
        <Popover.Trigger aria-label="User profile">
          <button
            type="button"
            className="flex items-center gap-2.5 outline-none group bg-transparent border-none cursor-pointer max-w-[200px]"
          >
            <Avatar
              size="sm"
              className="ring-2 ring-transparent group-hover:ring-[#0D3B66]/20 transition-all shrink-0"
            >
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback className="bg-[#0D3B66]/5 text-[#0D3B66] font-bold text-xs uppercase">
                {user?.name ? user?.name.slice(0, 2) : "UN"}
              </Avatar.Fallback>
            </Avatar>
          </button>
        </Popover.Trigger>

        <Popover.Content className="w-[calc(100vw-32px)] sm:w-[320px] max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(13,59,102,0.08)] p-4 sm:p-5">
          <Popover.Dialog className="outline-none w-full">
            <Popover.Heading>
              <div className="flex items-center gap-3.5 w-full">
                <Avatar
                  size="md"
                  className="w-12 h-12 shrink-0 ring-4 ring-slate-50"
                >
                  <Avatar.Image alt={user?.name} src={user?.image} />
                  <Avatar.Fallback className="bg-[#0D3B66]/5 text-[#0D3B66] font-black text-sm uppercase">
                    {user?.name ? user?.name.slice(0, 2) : "UN"}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="font-black text-slate-800 text-[15px] tracking-tight leading-tight truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-semibold text-slate-400 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Popover.Heading>

            <div className="my-4 h-[1px] w-full bg-slate-100/80" />

            <div className="space-y-1">
              <Link
                href="dashboard/profile"
                className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-[#0D3B66] transition-colors text-[13px] font-bold group"
              >
                <FiUser className="text-slate-400 group-hover:text-[#0D3B66] size-4 transition-colors shrink-0" />
                <span>My Profile</span>
              </Link>

              <Link
                href="#"
                className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-[#0D3B66] transition-colors text-[13px] font-bold group"
              >
                <FiSettings className="text-slate-400 group-hover:text-[#0D3B66] size-4 transition-colors shrink-0" />
                <span>Account Settings</span>
              </Link>

              <div className="my-1.5 h-[1px] w-full bg-slate-50" />

              <button
                onClick={async () =>
                  await authClient.signOut(router.push("/auth/signin"))
                }
                className="w-full h-10 px-3 rounded-xl flex items-center gap-3 text-rose-600 hover:bg-rose-50 transition-colors text-[13px] font-black group border-none text-left bg-transparent cursor-pointer"
              >
                <FiLogOut className="text-rose-400 group-hover:text-rose-600 size-4 transition-colors shrink-0" />
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
