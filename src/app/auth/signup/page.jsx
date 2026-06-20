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
import { useRouter } from "next/navigation";
import Image from "next/image";

// Icons
import { FiEye, FiEyeOff, FiUploadCloud } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SighUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState("user");
  const [fileName, setFileName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  // console.log(role);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        ...userData,
      });
      console.log(data, error);
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        toast.success("successfully signUp ");
      }
    } catch (err) {
      toast.error(err.message);
    }
    // console.log(payload);
  };

  // Handle image upload tracking
  // Handle image upload tracking
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSizeInBytes = 500 * 1024; // 512,000 Bytes
      if (file.size > maxSizeInBytes) {
        alert("File size is too large! Maximum allowed size is 500KB.");
        e.target.value = "";
        setFileName("");
        return;
      }

      setFileName(file.name);

      try {
        setIsUploading(true);

        const imgFormData = new FormData();
        imgFormData.append("image", file);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: imgFormData,
          },
        );

        const imgData = await response.json();

        if (imgData.success) {
          setPhotoURL(imgData.data.display_url);
          console.log("imgBB Upload Success:", imgData.data.display_url);
        } else {
          alert("Image upload failed. Please try again.");
          setFileName("");
        }
      } catch (error) {
        console.error("Error uploading image to imgBB:", error);
        alert("Something went wrong during image upload.");
        setFileName("");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC] text-slate-900 select-text relative">
      {/* --- LEFT PANEL: BRANDING & HERO IMAGE --- */}
      <div className="relative hidden lg:flex flex-col w-full min-h-screen bg-[#F8FAFC] border-r border-gray-100 overflow-hidden p-12">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/SplitScreenForSignup.png"
            alt="Logistics background"
            fill
            sizes="50vw"
            className="object-cover object-center opacity-90 select-none bg-no-repeat"
            style={{ objectFit: "cover", bgRepeat: "no-repeat" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-[#F8FAFC]/90 z-[1]" />
        </div>

        <div className="relative z-20 w-full self-start">
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
        </div>

        <div className="relative z-20 flex-grow flex flex-col justify-end max-w-md space-y-4 select-none pb-12">
          <h1 className="text-4xl font-extrabold text-[#0D3B66] tracking-tight leading-[1.2]">
            Streamline your <br />
            reading journey.
          </h1>
          <p className="text-slate-600 font-semibold text-[15px] leading-relaxed max-w-xs">
            Join thousands of readers and libraries connected by an efficient,
            data-driven logistics network.
          </p>
        </div>

        <div className="relative z-20 w-full self-end pt-6">
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
            <Link href="#" className="hover:text-[#F46036] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-[#F46036] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: THE FLOATING FORM CARD --- */}
      <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-[#F8FAFC]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-[650px] bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(13,59,102,0.04)] p-6 sm:p-10 transition-all duration-300"
        >
          <Form
            onSubmit={handleSignIn}
            className="w-full space-y-5"
            validationBehavior="native"
          >
            <Fieldset className="w-full space-y-4">
              {/* Header Title Section */}
              <div className="space-y-1.5">
                <Fieldset.Legend className="text-[28px] font-black tracking-tight text-[#0D3B66]">
                  Join BookDrop
                </Fieldset.Legend>
                <span className="text-[13px] font-medium text-slate-400 tracking-wide block">
                  Start your journey of reading and logistics today.
                </span>
              </div>

              {/* Form Input Layout Fields */}
              <div className="space-y-4 w-full pt-1">
                {/* --- Full Name and Email Address Fields (পাশাপাশি গ্রিড লেআউট) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 1. FULL NAME FIELD */}
                  <TextField
                    className="w-full"
                    isRequired
                    name="name"
                    type="text"
                  >
                    <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                      Full Name
                    </Label>
                    <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white ">
                      <InputGroup.Input
                        className="bg-transparent px-4 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                        placeholder="John Doe"
                      />
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                  </TextField>

                  {/* 2. EMAIL ADDRESS FIELD */}
                  <TextField
                    className="w-full"
                    name="email"
                    type="email"
                    isRequired
                  >
                    <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                      Email Address
                    </Label>
                    <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white ">
                      <InputGroup.Input
                        className="bg-transparent px-4 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                        placeholder="john@example.com"
                      />
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1" />
                  </TextField>
                </div>

                {/* 3. IMAGE FILE UPLOAD FIELD */}
                <div className="w-full">
                  <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                    Avatar Image Upload
                  </Label>
                  <label className="border border-gray-200 hover:border-[#0D3B66] focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white py-2.5 flex items-center px-4 justify-between cursor-pointer transition-colors group">
                    <span
                      className={`text-[13px] font-semibold truncate max-w-[80%] ${fileName ? "text-slate-800" : "text-slate-400"}`}
                    >
                      {fileName || "Choose file or drag here..."}
                    </span>
                    <FiUploadCloud className="text-slate-400 group-hover:text-[#0D3B66] size-4 transition-colors shrink-0" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* Password and I am a... Role Selection Grid Row (পাশাপাশি গ্রিড লেআউট) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 4. PASSWORD FIELD */}
                  <TextField
                    className="w-full"
                    name="password"
                    isRequired
                    validate={(value) => {
                      if (!value) return "Password is required";

                      // Regex Rule: At least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 chars
                      const passwordRegex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-.])[A-Z0-9a-z@$!%*?&#_\-.]{8,}$/;

                      if (!passwordRegex.test(value)) {
                        return "Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be min 8 characters.";
                      }
                      return null;
                    }}
                  >
                    <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                      Password
                    </Label>
                    <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white ">
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
                          {isVisible ? (
                            <FiEyeOff size={16} />
                          ) : (
                            <FiEye size={16} />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>
                    <FieldError className="text-xs font-semibold text-rose-500 mt-1 pl-1 max-w-[280px] sm:max-w-none block" />
                  </TextField>

                  {/* 6. ROLE SELECTION DROP-DOWN (DEFAULT: READERS) */}
                  <div className="w-full">
                    <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                      I am a...
                    </Label>
                    <div className="relative group">
                      <select
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full py-2.5 border border-gray-200 rounded-lg bg-white px-4 text-[13px] font-semibold text-slate-800 outline-none focus:border-[#0D3B66] focus:ring-1 focus:ring-[#0D3B66] appearance-none cursor-pointer transition-colors"
                        defaultValue="user"
                      >
                        <option
                          name="user"
                          value="user"
                          className="font-semibold text-slate-800"
                        >
                          Readers
                        </option>
                        <option
                          name="librarians"
                          value="librarians"
                          className="font-semibold text-slate-800"
                        >
                          Librarians
                        </option>
                      </select>
                      {/* কাস্টম ড্রপডাউন অ্যারো আইকন */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-slate-400 group-focus-within:border-t-[#0D3B66] transition-colors w-0 h-0" />
                    </div>
                  </div>
                </div>

                {/* 7. PRIVACY POLICY CHECKBOX SIMULATION */}
                <div className="flex items-start gap-2.5 pt-1 select-none">
                  <input
                    onChange={() => setAgree(!agree)}
                    type="checkbox"
                    id="terms"
                    className="mt-0.5 rounded border-gray-300 text-[#F46036] focus:ring-[#F46036] h-3.5 w-3.5 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-semibold text-slate-500 cursor-pointer leading-tight"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-[#0D3B66] hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#0D3B66] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
              </div>

              {/* ACTION EXECUTION BUTTON */}
              <Button
                isDisabled={!agree}
                type="submit"
                className="w-full py-3 bg-[#F46036] text-white font-bold text-sm rounded-lg shadow-md hover:bg-[#D34A26] transition-all duration-200 flex items-center justify-center uppercase tracking-wider"
              >
                Create Account
              </Button>
            </Fieldset>
          </Form>

          {/* OR DIVIDER */}
          <div className="flex items-center my-4 select-none">
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
            className="w-full py-3 border-gray-200 text-slate-700 hover:bg-slate-50 font-bold text-[14px] rounded-lg transition-all flex items-center justify-center gap-2 bg-transparent"
          >
            <FcGoogle className="text-lg shrink-0" />
            <span>Continue with Google</span>
          </Button>

          {/* DYNAMIC PATH SWITCH FOOTER LINK */}
          <div className="pt-5 w-full text-center text-xs font-bold text-slate-500 tracking-wide select-none">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-[#0D3B66] hover:underline ml-0.5"
            >
              Log in
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default SighUp;
