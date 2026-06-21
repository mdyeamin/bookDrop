"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  InputGroup,
  Label,
  Button,
  Select,
  ListBox,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiSend, FiShield, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";
import { PostBook } from "@/lib/action/books";

const AddNewBookForm = (userId) => {
  const [fileName, setFileName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { id: "Fiction", label: "Fiction" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Mystery-Thriller", label: "Mystery & Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Academic", label: "Academic" },
    { id: "History", label: "History" },
    { id: "Biography", label: "Biography" },
    { id: "Self-Help", label: "Self-Help" },
    { id: "Business", label: "Business & Economics" },
    { id: "Children", label: "Children's Books" },
    { id: "Poetry", label: "Poetry" },
  ];
  // 1. Image Upload & Validation Logic (Similar to Sign Up Page)
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // File Size Validation: Max 500KB
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

        // Fetch API Key from Environment
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
          e.target.value = "";
        }
      } catch (error) {
        console.error("Error uploading image to imgBB:", error);
        alert("Something went wrong during image upload.");
        setFileName("");
        e.target.value = "";
      } finally {
        setIsUploading(false);
      }
    }
  };

  // 2. Form Submit Logic
  const handleAddBook = async (e) => {
    e.preventDefault();

    // Prevent submission if image is still uploading or missing
    if (isUploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }
    if (!photoURL) {
      alert("Please upload a book cover image.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookData = Object.fromEntries(formData.entries());

    // Inject the uploaded image URL into the final data object
    const finalSubmitData = {
      ...bookData,
      image: photoURL,
      status: "pending",
      ...userId,
    };
    const res = await PostBook(finalSubmitData);

    if (res.insertedId) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
    }
    // Simulate Backend API delay

    toast.success("Book submitted successfully! Waiting for Admin approval.");

    // Reset Form visually
    e.target.reset();
    setFileName("");
    setPhotoURL("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(13,59,102,0.04)]">
        <Form
          onSubmit={handleAddBook}
          className="w-full space-y-6"
          validationBehavior="native"
        >
          <Fieldset className="w-full space-y-5">
            {/* ROW 1: TITLE & AUTHOR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField className="w-full" isRequired name="title" type="text">
                <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                  Book Title
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white">
                  <InputGroup.Input
                    className="bg-transparent px-4 py-2.5 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                    placeholder="Enter full title"
                  />
                </InputGroup>
              </TextField>

              <TextField
                className="w-full"
                isRequired
                name="author"
                type="text"
              >
                <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                  Author Name
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white">
                  <InputGroup.Input
                    className="bg-transparent px-4 py-2.5 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                    placeholder="Author's full name"
                  />
                </InputGroup>
              </TextField>
            </div>

            {/* ROW 2: CATEGORY & DELIVERY FEE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full">
                <Select
                  name="category"
                  isRequired
                  placeholder="Select category"
                  className="w-full"
                >
                  <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                    Category
                  </Label>
                  <Select.Trigger className="w-full border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg bg-white px-4 py-2.5 h-auto min-h-0 shadow-none transition-colors">
                    <Select.Value className="text-[13px] font-semibold text-slate-800 placeholder:text-slate-300" />
                    <Select.Indicator className="text-slate-400" />
                  </Select.Trigger>

                  <Select.Popover>
                    {/* Dynamic Array Mapping */}
                    <ListBox items={categoryOptions}>
                      {(item) => (
                        <ListBox.Item id={item.id} textValue={item.label}>
                          <span className="font-semibold text-slate-800">
                            {item.label}
                          </span>
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField
                className="w-full"
                isRequired
                name="deliveryFee"
                type="number"
              >
                <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                  Delivery Fee (USD)
                </Label>
                <InputGroup className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white flex items-center">
                  <span className="pl-4 pr-1 text-[13px] font-bold text-slate-400">
                    $
                  </span>
                  <InputGroup.Input
                    step="0.01"
                    className="bg-transparent pr-4 py-2.5 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none"
                    placeholder="0.00"
                  />
                </InputGroup>
              </TextField>
            </div>

            {/* ROW 3: DESCRIPTION */}
            <div className="w-full">
              <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                Description
              </Label>
              <div className="border border-gray-200 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] rounded-lg overflow-hidden bg-white">
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Brief summary of the book content and condition..."
                  className="bg-transparent px-4 py-3 text-[13px] font-semibold text-slate-800 placeholder:text-slate-300 w-full outline-none resize-y block"
                />
              </div>
            </div>

            {/* ROW 4: BOOK COVER IMAGE */}
            <div className="w-full pt-1">
              <Label className="text-[10px] font-black text-[#0D3B66] tracking-widest uppercase mb-1.5 block">
                Book Cover Image
              </Label>
              <label className="relative border border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-white hover:border-[#0D3B66] hover:bg-slate-50 focus-within:border-[#0D3B66] focus-within:ring-1 focus-within:ring-[#0D3B66] transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                />
                <div
                  className={`w-12 h-12 bg-[#FFF0ED] text-[#D34A26] rounded-full flex items-center justify-center mb-3 transition-transform duration-300 ${!isUploading && "group-hover:scale-110"}`}
                >
                  <FiUploadCloud
                    size={24}
                    strokeWidth={2.5}
                    className={isUploading ? "animate-pulse" : ""}
                  />
                </div>
                <h4 className="text-[14px] font-bold text-[#0D3B66] mb-1 truncate max-w-[80%] text-center">
                  {isUploading
                    ? "Uploading to ImgBB..."
                    : fileName
                      ? fileName
                      : "Click or drag to upload"}
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  MAX. 500KB
                </p>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                isDisabled={isSubmitting || isUploading}
                className="w-full md:w-auto px-8 py-6 bg-[#F46036] hover:bg-[#D34A26] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-md transition-all duration-200"
              >
                {!isSubmitting && !isUploading && <FiSend size={18} />}
                {isSubmitting
                  ? "Submitting..."
                  : isUploading
                    ? "Waiting for Image..."
                    : "Submit for Approval"}
              </Button>
            </div>
          </Fieldset>
        </Form>
      </div>

      {/* BOTTOM INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0A2540] rounded-xl p-5 flex items-start gap-4 shadow-[0_10px_30px_rgba(10,37,64,0.1)]">
          <div className="mt-0.5">
            <FiShield size={26} className="text-blue-300" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-white font-bold text-[14px] mb-1">
              Quality Check
            </h4>
            <p className="text-blue-200/70 text-[12px] leading-relaxed font-semibold">
              Our curators review all listings within 24 hours.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 flex items-start gap-4 border border-gray-100 shadow-[0_10px_30px_rgba(13,59,102,0.03)]">
          <div className="mt-0.5">
            <FiTruck size={26} className="text-slate-400" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-[#0D3B66] font-bold text-[14px] mb-1">
              Shipping Tiers
            </h4>
            <p className="text-slate-500 text-[12px] leading-relaxed font-semibold">
              Calculated based on weight and destination distance.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddNewBookForm;
