"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Form,
  Fieldset,
  TextField,
  InputGroup,
  Label,
  FieldError,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiTruck, FiTrendingUp, FiBox } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log("Login Attempt Data:", userData);
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#EAECEF] bg-[radial-gradient(#cdd2d9_1px,transparent_1px)] [background-size:20px_24px] text-slate-900 select-text relative">
      
      {/* --- LEFT PANEL: THE FLOATING FORM CARD --- */}
      <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[460px] bg-white rounded-2xl border border-gray-100/80 shadow-[0_20px_50px_rgba(13,59,102,0.04)] p-6 sm:p-10 transition-all duration-300"
        >
          {/* Top Logo */}
          <div className="relative w-[140px] h-[36px] mb-8 select-none">
            <Image
              src="/BookDrop.png"
              alt="BookDrop Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <Form
            onSubmit={handleSignIn}
            className="w-full space-y-5"
            validationBehavior="native"
          >
            <Fieldset className="w-full space-y-4">
              {/* Header Title Section */}
              <div className="space-y-1">
                <Fieldset.Legend className="text-[32px] font-black tracking-tight text-[#0D3B66]">
                  Welcome Back
                </Fieldset.Legend>
                <span className="text-[14px] font-semibold text-slate-500 tracking-wide block">
                  Log in to manage your deliveries and library.
                </span>
              </div>

              {/* Form Input Layout Fields */}
              <div className="space-y-4 w-full pt-2">
                {/* 1. EMAIL ADDRESS FIELD */}
                <TextField className="w-full" name="email" type="email" isRequired>
                  <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                    Email Address
                  </Label>
                  <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white">
                    <InputGroup.Input
                      className="bg-transparent px-4 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                      placeholder="name@company.com"
                    />
                  </InputGroup>
                  <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                </TextField>

                {/* 2. PASSWORD FIELD */}
                <TextField className="w-full" name="password" isRequired>
                  <div className="flex items-center justify-between mb-1.5 w-full">
                    <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase block">
                      Password
                    </Label>
                    <Link
                      href="#"
                      className="text-[11px] font-bold text-[#0D3B66] hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white">
                    <InputGroup.Input
                      className="bg-transparent pl-4 pr-1 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                      type={isVisible ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <InputGroup.Suffix className="pr-1.5">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-slate-400 hover:text-slate-600 rounded-md min-w-0 p-0 bg-transparent"
                        onPress={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                </TextField>

                {/* REMEMBER ME CHECKBOX */}
                <div className="flex items-center gap-2.5 pt-1 select-none">
                  <input
                    onChange={() => setRememberMe(!rememberMe)}
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-[#F46036] focus:ring-[#F46036] h-3.5 w-3.5 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs font-semibold text-slate-500 cursor-pointer leading-tight"
                  >
                    Remember Me
                  </label>
                </div>
              </div>

              {/* ACTION EXECUTION BUTTON */}
              <Button
                type="submit"
                className="w-full py-3 bg-[#F46036] text-white font-bold text-sm rounded-lg shadow-md hover:bg-[#D34A26] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
              >
                Sign In
              </Button>
            </Fieldset>
          </Form>

          {/* OR DIVIDER */}
          <div className="flex items-center my-5 select-none">
            <div className="flex-grow border-t border-gray-100" />
            <span className="px-3 text-[11px] font-black text-slate-400 tracking-widest">
              OR
            </span>
            <div className="flex-grow border-t border-gray-100" />
          </div>

          {/* GOOGLE SIGN-IN BUTTON */}
          <Button
            type="button"
            variant="bordered"
            className="w-full py-3 border-gray-200 text-slate-700 hover:bg-slate-50 font-bold text-[13px] rounded-lg transition-all flex items-center justify-center gap-2 bg-transparent uppercase tracking-wider"
          >
            <FcGoogle className="text-lg shrink-0" />
            <span>Continue with Google</span>
          </Button>

          {/* DYNAMIC PATH SWITCH FOOTER LINK */}
          <div className="pt-6 w-full text-center text-xs font-bold text-slate-500 tracking-wide select-none">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#0D3B66] hover:underline ml-0.5">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT PANEL: ANALYTICS INFRASTRUCTURE --- */}
      <div className="relative hidden lg:flex flex-col w-full min-h-screen overflow-hidden p-16 justify-center bg-transparent">
        <div className="w-full max-w-[520px] mx-auto space-y-5">
          
          {/* Card 1: Global Fleet Tracking */}
          <div className="w-full bg-white rounded-xl shadow-[0_10px_30px_rgba(13,59,102,0.02)] p-6 flex flex-col space-y-4 border border-gray-100/50">
            <div className="w-11 h-11 bg-[#0D3B66] rounded-lg flex items-center justify-center text-white text-lg shadow-inner">
              <FiTruck strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#0D3B66] tracking-tight">
                Global Fleet Tracking
              </h3>
              <p className="text-[13px] text-slate-500 font-semibold leading-relaxed">
                Monitor your shipments in real-time across all active zones with precision routing.
              </p>
            </div>
          </div>

          {/* Row Combo Grid */}
          <div className="grid grid-cols-2 gap-5 w-full">
            
            {/* Card 2: 99% On-Time Delivery */}
            <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(13,59,102,0.02)] p-6 flex flex-col justify-between h-[155px] border border-gray-100/50">
              <FiTrendingUp className="text-[#F46036] text-xl" strokeWidth={2.5} />
              <div className="space-y-0.5">
                <span className="text-4xl font-black text-[#0D3B66] tracking-tighter block leading-none">
                  99%
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                  On-Time Delivery
                </span>
              </div>
            </div>

            {/* Card 3: Smart Routing */}
            <div className="bg-[#0D3B66] rounded-xl shadow-[0_15px_35px_rgba(13,59,102,0.15)] p-6 flex flex-col justify-between h-[155px] text-white">
              <FiBox className="text-emerald-400 text-xl" strokeWidth={2.5} />
              <div className="space-y-1">
                <h4 className="text-[15px] font-extrabold tracking-tight leading-tight">
                  Smart Routing
                </h4>
                <p className="text-[11px] text-slate-300 font-medium leading-normal">
                  AI-driven path optimization.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  );
};

export default SignIn;